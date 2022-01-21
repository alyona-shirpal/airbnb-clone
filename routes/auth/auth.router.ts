import { Router } from 'express';

import * as authController from '../../controllers';
import * as authMiddleware from '../../middlewares';
const router = Router();

router.post('/login', authMiddleware.isDataValid, authController.login);
router.post('/logout');

export const authRouter = router;
