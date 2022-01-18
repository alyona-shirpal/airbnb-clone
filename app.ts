import * as express from 'express';
import * as path from 'path';

import * as dotenv from 'dotenv';

import {authRouter} from './routes/auth/auth.router'
import {userRouter} from './routes/user/user.router';
import {sequelize} from './config/sequelize';

dotenv.config();

class App {
    public readonly app: express.Application = express();

    constructor() {
        this.connectDB();

        (global as any).appRoot = path.resolve(process.cwd(), '../');

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));

        this.app.use(express.static(path.resolve((global as any).appRoot, 'public')));

        this.mountRoutes();

    }

    private async connectDB() {
        try {
            await sequelize.authenticate()
            console.log('Connection established successfully.');
        } catch (e) {
            console.log('Database is not connected')
            console.error(e);
        }

        try {
            await sequelize.sync({force: true});
            console.log('Drop and re-sync db.');
        } catch (e) {
            console.error('Unable to sync database, reason: ')
            console.error(e)
        }
    }

    private mountRoutes(): void {
        this.app.use('/users', userRouter);
        this.app.use('/auth', authRouter);
    }

}

export const app = new App().app;
