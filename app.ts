import * as express from 'express';

import * as path from 'path';
import * as cors from 'cors';

import { authRouter, userRouter, apartmentRouter } from './routes';
import { sequelize } from './config/sequelize';

class App {
    public readonly app: express.Application = express();

    constructor () {
        this.connectDB();

        (global as any).appRoot = path.resolve(process.cwd(), '../');
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(express.static(path.resolve((global as any).appRoot, 'public')));

        this.mountRoutes();
    }

    private async connectDB () {
        try {
            await sequelize.authenticate();
            console.log('Connection established successfully.');
        } catch (e) {
            console.log('Database is not connected');
            console.error(e);
        }

        try {
            await sequelize.sync({ force: false });
            console.log('Drop and re-sync db.');
        } catch (e) {
            console.error('Unable to sync database, reason: ');
            console.error(e);
        }
    }

    private mountRoutes (): void {
        this.app.use('/users', userRouter);
        this.app.use('/auth', authRouter);
        this.app.use('/apartments', apartmentRouter);
    };
}

export const app = new App().app;
