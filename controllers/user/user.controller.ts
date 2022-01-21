import { Request, Response, NextFunction } from 'express';

import { ActionEnum, ResponseStatusCodesEnum } from '../../constants';
import { ErrorHandler, errors } from '../../errors';
import { emailService } from '../../services/email.services';
import { HASH_PASSWORD, tokenizer } from '../../helpers';
import { userValidator } from '../../validators';
import { User } from '../../db/models';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        const userValidity = userValidator.validate(user);
        console.log(userValidity);

        if (!userValidity) {
            throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, errors.BAD_REQUEST_USER_ALREADY_EXIST.message);
        }

        user.password = await HASH_PASSWORD(user.password);

        await User.create(user);
        const { access_token } = tokenizer(ActionEnum.USER_REGISTER);
        await emailService.sendEmail(user.email, ActionEnum.USER_REGISTER, { token: access_token });

        res.status(ResponseStatusCodesEnum.CREATED).end();
    } catch (e) {
        next(e);
    }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req;
        res.json(user);
    } catch (e) {
        next(e);
    }
};
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            throw new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, errors.NOT_FOUND_USER_NOT_PRESENT.message);
        }

        await User.destroy({ where: { user_id } });

        res.status(ResponseStatusCodesEnum.DELETED).end();
    } catch (e) {
        next(e);
    }
};
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id } = req.params;

        if (!user_id) {
            throw new ErrorHandler(ResponseStatusCodesEnum.NOT_FOUND, errors.NOT_FOUND_USER_NOT_PRESENT.message);
        }

        await User.update({ ...req.body }, { where: { user_id } });

        res.status(ResponseStatusCodesEnum.UPDATED).end();
    } catch (e) {
        next(e);
    }
};

export {
    createUser, getUser, deleteUser, updateUser
};
