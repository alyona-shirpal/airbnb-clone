import { Request, Response, NextFunction } from 'express';

import { COMPARE_PASSWORD, HASH_PASSWORD, tokenizer } from '../../services';
import { userValidator } from '../../validators';
import { ErrorHandler, errors } from '../../errors';
import { ResponseStatusCodesEnum } from '../../constants';
import { User } from '../../db/models';

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const isEmailValid = userValidator.validate(email);
        console.log(isEmailValid);

        if (!isEmailValid) {
            throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST,
                errors.UNAUTHORIZED_WRONG_CREDENTIALS.message);
        }

        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            throw new ErrorHandler(
                ResponseStatusCodesEnum.NOT_FOUND,
                errors.NOT_FOUND_USER_NOT_PRESENT.message
            );
        }

        const hashPassword = await HASH_PASSWORD(password);

        const isPasswordValid = await COMPARE_PASSWORD(password, hashPassword);

        if (!isPasswordValid) {
            throw new ErrorHandler(
                ResponseStatusCodesEnum.NOT_FOUND,
                errors.NOT_FOUND_USER_NOT_PRESENT.message
            );
        }
        const tokenPair = tokenizer(user.user_id, user.roles);

        res.json({ data: tokenPair });
    } catch (e) {
        next(e);
    }
};

export { login };
