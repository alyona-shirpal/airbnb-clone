import { Sequelize } from 'sequelize-typescript';

import { Apartment, Auth, User } from '../db/models';

export const sequelize = new Sequelize({
    database: 'db',
    dialect: 'mysql',
    username: 'root',
    password: 'root',
    models: [User, Apartment, Auth],
    sync: {
        force: true
    }
});
