import { Router } from 'express';

import * as apartmentController from '../../controllers';
import * as authMiddleware from '../../middlewares';

const router = Router();

router.get('/', apartmentController.getAll);
router.get('/:apartment_id', apartmentController.getOne);
router.post('/', authMiddleware.checkAccessToken, apartmentController.postApartment);
router.delete('/:apartment_id', authMiddleware.checkAccessToken, apartmentController.deleteApartment);
router.patch('/:apartment_id', apartmentController.updateApartment);

export const apartmentRouter = router;
