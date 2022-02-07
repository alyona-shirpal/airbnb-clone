import { Router } from 'express';

import * as authController from '../../controllers';

const router = Router();

router.post('/login', authController.login);

export const authRouter = router;
