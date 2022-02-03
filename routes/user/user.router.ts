import { Router } from 'express';

import * as userController from '../../controllers/user/user.controller';
import * as authMiddleware from '../../middlewares/auth/auth.middleware';
import * as userMiddleware from '../../middlewares/user/user.middleware';

const router = Router();

router.post('/',
    userMiddleware.isEmailUnique,
    userController.createUser);
router.delete('/:user_id',
    userMiddleware.isUserIdPresent,
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRole(['ADMIN']),
    userController.deleteUser);

router.patch('/:user_id',
    userMiddleware.isUserIdPresent,
    authMiddleware.checkAccessToken,
    userController.updateUser);

export const userRouter = router;
