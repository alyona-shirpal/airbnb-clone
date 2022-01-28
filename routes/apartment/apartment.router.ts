import { Router } from 'express';
import * as multer from 'multer';

import * as apartmentController from '../../controllers';
import * as authMiddleware from '../../middlewares';
import { storage } from '../../config/storageEngine';

const router = Router();

const upload = multer({ storage });

router.get('/', apartmentController.getAll);
router.get('/:apartment_id', apartmentController.getOne);

router.post('/', authMiddleware.checkAccessToken, apartmentController.postApartment);
router.post('/upload_files', upload.array('file', 3), authMiddleware.checkAccessToken, apartmentController.uploadImages);
router.delete('/:apartment_id', authMiddleware.checkAccessToken, apartmentController.deleteApartment);
router.patch('/:apartment_id', apartmentController.updateApartment);

export const apartmentRouter = router;
