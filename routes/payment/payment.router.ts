import { Router } from 'express';

import * as authMiddleware from '../../middlewares';
import * as paymentController from '../../controllers';

const router = Router();

router.post('/card/create', authMiddleware.checkAccessToken, paymentController.createBankCard);

router.post('/card/:cardId/purchase/:booking_id', authMiddleware.checkAccessToken, paymentController.payingProcess);

export const paymentRouter = router;
