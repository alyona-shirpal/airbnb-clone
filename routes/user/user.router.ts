import { Router } from 'express';

import * as userController from '../../controllers/user/user.controller';
import * as authMiddleware from '../../middlewares/auth/auth.middleware';
import * as userMiddleware from '../../middlewares/user/user.middleware';

const router = Router();

router.get('/:user_id', userMiddleware.isUserIdPresent, userController.getUser);
router.post('/', userMiddleware.isEmailUnique, userController.createUser);
router.delete('/:user_id', userMiddleware.isUserIdPresent, authMiddleware.checkAccessToken, userController.deleteUser);
router.patch('/:user_id', userMiddleware.isUserIdPresent, authMiddleware.checkAccessToken, userController.updateUser);

export const userRouter = router;
