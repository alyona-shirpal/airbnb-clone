import * as jwt from 'jsonwebtoken';

import { config } from '../config';

export const tokenizer = (userId: number, role: string) => {
    const access_token:string = jwt.sign({ type: 'ACCESS', role }, config.JWT_ACCESS_SECRET, { expiresIn: config.ACCESS_TOKEN_LIFETIME, subject: userId.toString() });
    const refresh_token:string = jwt.sign({ type: 'REFRESH', role }, config.JWT_REFRESH_SECRET, { expiresIn: config.REFRESH_TOKEN_LIFETIME, subject: userId.toString() });
    return {
        access_token, refresh_token
    };
};
