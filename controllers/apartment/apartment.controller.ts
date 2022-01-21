import { NextFunction, Request, Response } from 'express';

import { Apartment } from '../../db/models';

import { ResponseStatusCodesEnum } from '../../constants';

const postApartment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const { user_id } = req.user;
        const apartment = req.body;

        await Apartment.create(apartment);
        // const { access_token } = tokenizer(ActionEnum.USER_REGISTER);
        // await emailService.sendEmail(apartment.email, ActionEnum.USER_REGISTER, { token: access_token });

        res.status(ResponseStatusCodesEnum.CREATED).end();
    } catch (e) {
        next(e);
    }
};

export { postApartment };
