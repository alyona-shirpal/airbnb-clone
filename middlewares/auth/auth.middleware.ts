import {Request, Response, NextFunction,} from 'express';
import {verify} from 'jsonwebtoken';

import {ErrorHandler} from '../../errors';
import {ResponseStatusCodesEnum} from '../../constants';
import {config} from '../../config';
import {OAuth} from '../../db/models/oauth.model';


const checkAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authToken = req.get('Authorization') as string;

        if (!authToken) {
            throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, 'No token');
        }

        verify(authToken, config.JWT_ACCESS_SECRET, (err) => {
            if (err) {
                return next(new ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, 'Invalid token'));
            }
        });

        //const tokenResponse = await O_Auth.findOne({access_token: token});
        const tokenResponse: any =  await OAuth.findOne({where: {access_token: authToken}});

        if (!tokenResponse) {
           throw new Error ErrorHandler(ResponseStatusCodesEnum.UNAUTHORIZED, errors.NOT_FOUND_USER_NOT_PRESENT.message);
        }


        next();
    } catch (e) {
        next(e);
    }
}

export {checkAccessToken};