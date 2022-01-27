// declare namespace Express {
//     // import { User } from '../../db/models';
//
//     export interface Request {
//         // user: User;
//         user?: any;
//     }
// }

// eslint-disable-next-line no-unused-vars
declare namespace Express {
    // @ts-ignore
    import { User } from '../../db/models';

    export interface Request {
        user: User;
    }
}
