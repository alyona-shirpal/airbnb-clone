import * as jwt from 'jsonwebtoken';

import { config } from '../config';
import { ErrorHandler } from '../errors';
import { ActionEnum, ResponseStatusCodesEnum } from '../constants';

export const tokenizer = (action: ActionEnum): { access_token: string, refresh_token: string} => {
    let access_token = '';
    let refresh_token = '';
    const expiresTime: string | number = config.REFRESH_TOKEN_LIFETIME;

    switch (action) {
        case ActionEnum.USER_AUTH:
            access_token = jwt.sign({}, config.JWT_ACCESS_SECRET, { expiresIn: config.ACCESS_TOKEN_LIFETIME });
            refresh_token = jwt.sign({}, config.JWT_REFRESH_SECRET, { expiresIn: expiresTime });
            break;
        case ActionEnum.FORGOT_PASSWORD:
            access_token = jwt.sign({}, config.JWT_FORGOT_PASSWORD_SECRET, { expiresIn: config.JWT_FORGOT_PASSWORD_LIFETIME });
            break;
        case ActionEnum.USER_REGISTER:
            access_token = jwt.sign({}, config.JWT_CONFIRM_EMAIL_SECRET, { expiresIn: config.JWT_CONFIRM_EMAIL_LIFETIME });
            break;
        default:
            throw new ErrorHandler(ResponseStatusCodesEnum.SERVER_ERROR, 'Wrong action type');
    }
    return {
        access_token, refresh_token
    };
};
