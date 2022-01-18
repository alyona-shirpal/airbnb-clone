import {  Request, Response,  NextFunction,} from 'express';

import { User } from '../../db/models/users.model';
import {ResponseStatusCodesEnum} from '../../constants';
import {userValidator} from '../../validators';
import {ErrorHandler} from '../../errors';
import {HASH_PASSWORD} from '../../helpers/password-hasher.helper';


const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;
        const userValidity = userValidator.validate(user);

        if(userValidity.error) {
            throw new ErrorHandler(ResponseStatusCodesEnum.BAD_REQUEST, userValidity.error.details[0].message);
        }

        user.password = await HASH_PASSWORD(user.password);

        await User.create(user)

        res.status(ResponseStatusCodesEnum.CREATED).end();

    } catch (e) {
        next(e);
    }
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.body;

        const users = await User.findAll(user)
        res.json(users)

    } catch (e) {
        next(e);
    }
};
const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id } = req.params;

        const user= await User.findByPk(user_id)
        res.json(user)
    } catch (e) {
        next(e);
    }
};
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {  user_id } = req.params;

        if(!user_id) {
            throw new Error ('wrong id')
        }

        await User.destroy({ where: {
            user_id,
        }})

        res.status(ResponseStatusCodesEnum.DELETED).end();
    } catch (e) {
        next(e);
    }
}
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {  user_id } = req.params;

        if(!user_id) {
            throw new Error ('wrong id')
        }

        await User.update({ ...req.body }, { where: { user_id } });
        
        res.status(ResponseStatusCodesEnum.UPDATED)
    } catch (e) {
        next(e);
    }
}

export {
    createUser, getAllUsers, getUser, deleteUser, updateUser
};