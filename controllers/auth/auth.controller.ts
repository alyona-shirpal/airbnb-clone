import {Request, Response, NextFunction,} from 'express';

import * as jwtHelper from '../../helpers/jwt.helper'
import {UserActionEnum} from '../../constants/user-action.enum';
import {OAuth} from '../../db/models/oauth.model';

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.body;

        const tokenPair = jwtHelper.tokenizer(UserActionEnum.AUTH)
        await OAuth.create({...tokenPair, user_id: id  })

        res.json({data: tokenPair})
    } catch (e) {
        next(e);
    }

}

export { login};