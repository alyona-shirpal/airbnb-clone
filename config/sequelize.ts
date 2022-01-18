import { Sequelize } from 'sequelize-typescript';

import {Apartment} from '../db/models/apartments.model';
import {User} from '../db/models/users.model';
import {OAuth} from '../db/models/oauth.model';

export const sequelize = new Sequelize({
    database: 'db',
    dialect: 'mysql',
    username: 'root',
    password: 'rootroot',
    models: [User, Apartment, OAuth],
    sync: {
        force: true,
    },
})

