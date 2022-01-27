import { Sequelize } from 'sequelize-typescript';

import { Apartment, User, Booking } from '../db/models';

export const sequelize = new Sequelize({
    database: 'db',
    dialect: 'mysql',
    username: 'root',
    password: 'root',
    models: [User, Apartment, Booking]
});
