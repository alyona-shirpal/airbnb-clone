import { Request, Response, NextFunction } from 'express';

import * as jwtHelper from '../../helpers/jwt.helper';
import { Auth } from '../../db/models';
import { ActionEnum } from '../../constants';

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;

        const tokenPair = jwtHelper.tokenizer(ActionEnum.USER_AUTH);
        await Auth.create({ ...tokenPair, user_id: id });

        res.json({ data: tokenPair });
    } catch (e) {
        next(e);
    }
};

export { login };
