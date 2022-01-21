import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { ErrorHandler, errors } from '../../errors';
import { ResponseStatusCodesEnum } from '../../constants';
import { config } from '../../config';
import { Auth, User } from '../../db/models';
import { userValidator } from '../../validators';
import { COMPARE_PASSWORD, HASH_PASSWORD } from '../../helpers';

const isDataValid = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const isEmailValid = userValidator.validate(email);

        if (!isEmailValid) {
            throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST,
                errors.UNAUTHORIZED_WRONG_CREDENTIALS.message);
        }

        const user = await User.findOne(email);

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

        next();
    } catch (e) {
        next(e);
    }
};

const checkAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.get('Authorization') as string;

        await verify(authToken, config.JWT_ACCESS_SECRET, (err) => {
            if (err) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, 'Invalid token'));
            }
        });

        const tokenResponse: any = await Auth.findOne({ where: { access_token: authToken } });
        console.log(tokenResponse);

        if (!tokenResponse) {
            throw new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, errors.UNAUTHORIZED_WRONG_TOKEN.message);
        }

        // req.user = tokenResponse;

        next();
    } catch (e) {
        next(e);
    }
};

export { checkAccessToken, isDataValid };
