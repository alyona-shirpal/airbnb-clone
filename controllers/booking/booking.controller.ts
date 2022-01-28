import { Request, Response, NextFunction } from 'express';

import { Apartment, Booking, User } from '../../db/models';
import { ActionEnum, ResponseStatusCodesEnum } from '../../constants';
import { Op } from 'sequelize';
import { emailService } from '../../services/email.services';

const bookPlace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { apartment_id } = req.params;
        const { user_id } = req.user;
        const booking = req.body;

        const apartment = await Apartment.findByPk(apartment_id);

        if (!apartment) {
            return res.status(404);
        }

        const dayFrom = new Date(booking.from);
        const dayTo = new Date(booking.to);
        const differenceInTime = dayTo.getTime() - dayFrom.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        booking.user_id = user_id;
        booking.total_price = apartment.price * differenceInDays;
        booking.apartment_id = apartment_id;

        const bookedDate = await Booking.findOne({
            where: {
                apartment_id: apartment.apartment_id,
                [Op.and]: [
                    { from: { [Op.gte]: dayFrom } },
                    { to: { [Op.lte]: dayTo } }]
            }
        });

        if (bookedDate) {
            return res.status(400).send('These days are booked');
        }

        await Booking.create(booking);

        const tenant = await User.findOne({ where: { user_id } });

        if (!tenant) { return res.status(404) }

        await emailService.sendEmail(tenant.email, ActionEnum.CONFIRM_BOOKING, { username: tenant.username });

        res.status(ResponseStatusCodesEnum.CREATED).end();
    } catch (e) {
        next(e);
    }
};

const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        await Booking.destroy({ where: { id } });

        res.status(ResponseStatusCodesEnum.DELETED).end();
    } catch (e) {
        next(e);
    }
};

const isApprovedBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { isApproved } = req.body;

        if (isApproved) {
            await Booking.update({ ...req.body }, { where: { id } });

            res.send('your Booking has been successfully approved ');
        } else {
            res.send('sorry you have been rejected by host');
        }
        res.status(ResponseStatusCodesEnum.APPROVED).end();
    } catch (e) {
        next(e);
    }
};

export { bookPlace, deleteBooking, isApprovedBooking };
