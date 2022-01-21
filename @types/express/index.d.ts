// declare namespace Express {
//     // import { User } from '../../db/models';
//
//     export interface Request {
//         // user: User;
//         user?: any;
//     }
// }

declare namespace Express {
    export interface Request {
        user: any;
    }
    export interface Response {
        user: any;
    }
}
