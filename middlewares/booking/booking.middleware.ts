import { NextFunction, Request, Response } from 'express';

import { Booking, Apartment } from '../../db/models';
import { ErrorHandler, errors } from '../../errors';
import { ResponseStatusCodesEnum } from '../../constants';

const isIdPresent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { booking_id } = req.params;
        const id = await Booking.findByPk(booking_id);

        if (!id) {
            throw new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, errors.NOT_FOUND_USER_NOT_PRESENT.message);
        }

        next();
    } catch (e) {
        next(e);
    }
};

const isApartmentAvailable = async (req: Request, res: Response, next: NextFunction) => {

};

const isHostId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req;
        console.log(user);

        const hostId = await Apartment.findByPk(user.user_id);

        console.log(hostId);

        if (!hostId) {
            return res.status(404);
        }

        if (user.user_id === hostId.user_id) {
            next();
        } else {
            return res.status(404).send('you are not a host to confirm the booking');
        }
    } catch (e) {
        next(e);
    }
};
export { isIdPresent, isHostId, isApartmentAvailable };
