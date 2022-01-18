import {Router} from 'express';

import * as authController from '../../controllers'
const router = Router();

router.post('/login', authController.login )
router.post('/logout')

export const authRouter = router;