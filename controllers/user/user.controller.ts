import { Request, Response, NextFunction } from 'express';

import { ActionEnum, ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { emailService, HASH_PASSWORD } from '../../services';
import { userValidator } from '../../validators';
import { User } from '../../db/models';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        const userValidity = userValidator.validate(user);

        if (!userValidity) {
            throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, errors.BAD_REQUEST_USER_ALREADY_EXIST.message);
        }

        user.password = await HASH_PASSWORD(user.password);
        const newUser = await User.create(user);

        await emailService.sendEmail(user.email, ActionEnum.USER_REGISTER, { userName: newUser.username });

        res.status(ResponseStatusCodesEnum.CREATED).end();
    } catch (e) {
        next(e);
    }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id } = req.params;

        await User.destroy({ where: { user_id } });

        res.status(ResponseStatusCodesEnum.DELETED).end();
    } catch (e) {
        next(e);
    }
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id } = req.user;

        await User.update({ ...req.body }, { where: { user_id } });

        res.status(ResponseStatusCodesEnum.UPDATED).end();
    } catch (e) {
        next(e);
    }
};

export {
    createUser, deleteUser, updateUser
};
