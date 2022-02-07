import { Sequelize } from 'sequelize-typescript';

import { Apartment, User, Booking, Files, UserPaymentInfo, Transaction} from '../db/models';

export const sequelize = new Sequelize({
    database: 'db',
    dialect: 'mysql',
    username: 'root',
    password: 'root',
    models: [User, Apartment, Booking, Files, UserPaymentInfo, Transaction]
});
