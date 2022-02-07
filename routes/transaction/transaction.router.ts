import { Router } from 'express';

import * as transactionController from '../../controllers';
import * as authMiddleware from '../../middlewares';
import * as userMiddleware from '../../middlewares';
const router = Router();

router.get('/',
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRole(['ADMIN']),
    transactionController.allTransactions );

export const transactionRouter = router;