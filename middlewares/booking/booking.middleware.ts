import { NextFunction, Request, Response } from 'express';

import { Booking, Apartment } from '../../db/models';
import { ErrorHandler, errors } from '../../errors';
import { ResponseStatusCodesEnum } from '../../constants';

const isIdPresent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const bookingId = await Booking.findByPk(id);

        if (!bookingId) {
            throw new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, errors.NOT_FOUND_USER_NOT_PRESENT.message);
        }

        next();
    } catch (e) {
        next(e);
    }
};

const isHostId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req;

        const hostId = await Apartment.findByPk(user.user_id);

        // todo fix host confirmation if host has more then one apartment

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
export { isIdPresent, isHostId };
