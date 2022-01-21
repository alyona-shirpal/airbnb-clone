import { Router } from 'express';

import * as apartmentController from '../../controllers';
import * as authMiddleware from '../../middlewares';

const router = Router();

router.get('/');
router.get('/:apartment_id');
router.post('/', authMiddleware.checkAccessToken, apartmentController.postApartment);
router.delete('/:apartment_id');
router.patch('/:apartment_id');

export const apartmentRouter = router;
