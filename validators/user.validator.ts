import * as Joi from 'joi';

import { RegExpEnum } from '../constants';

export const userValidator = Joi.object().keys({
    username: Joi.string().max(255).required(),
    lastname: Joi.string().max(255),
    email: Joi.string().regex(RegExpEnum.email).required(),
    password: Joi.string().regex(RegExpEnum.password).required(),
    phone_number: Joi.string().regex(RegExpEnum.phone_number),
    date: Joi.alternatives(Joi.any().valid())
});
