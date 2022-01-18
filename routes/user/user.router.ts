import {Router} from 'express';

import * as userController from '../../controllers/user/user.controller';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:user_id', userController.getUser);
router.post('/', userController.createUser);
router.delete('/:user_id', userController.deleteUser);
router.patch('/:user_id', userController.updateUser)

export const userRouter = router;