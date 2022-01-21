import { NextFunction, Request, Response } from 'express';

import { ErrorHandler, errors } from '../../errors';
import { ResponseStatusCodesEnum } from '../../constants';
import { User } from '../../db/models';

const isUserIdPresent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id } = req.params;
        const userId = await User.findByPk(user_id);

        if (!userId) {
            throw new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, errors.NOT_FOUND_USER_NOT_PRESENT.message);
        }
        req.user = userId;
        next();
    } catch (e) {
        next(e);
    }
};
const isEmailUnique = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;

        const userByEmail = await User.findOne({ where: { email } });

        if (userByEmail) {
            throw new ErrorHandler(ResponseStatusCodesEnum.ALREADY_EXISTS, errors.ALREADY_EXISTS.message);
        }

        next();
    } catch (e) {
        next(e);
    }
};
export { isUserIdPresent, isEmailUnique };
