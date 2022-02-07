import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { ErrorHandler, errors } from '../../errors';
import { ResponseStatusCodesEnum } from '../../constants';
import { config } from '../../config';
import { User } from '../../db/models';

const checkAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.get('Authorization') as string;

        await jwt.verify(authToken, config.JWT_ACCESS_SECRET);

        const payload: any = jwt.decode(authToken);

        if (payload.type !== 'ACCESS') {
            throw new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, 'Token type is not ACCESS');
        }

        const authUser = await User.findOne({ where: { user_id: payload.sub } });

        if (!authUser) {
            throw new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, errors.UNAUTHORIZED_WRONG_TOKEN.message);
        }

        req.user = authUser;

        next();
    } catch (e) {
        next(e);
    }
};

export { checkAccessToken };
