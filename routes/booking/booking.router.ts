import { Router } from 'express';

import * as authMiddleware from '../../middlewares';
import * as bookingController from '../../controllers';
import * as bookingMiddleware from '../../middlewares/booking/booking.middleware';
import * as userMiddleware from '../../middlewares/user/user.middleware';

const router = Router();

router.post('/:apartment_id',
    authMiddleware.checkAccessToken,
    bookingController.bookPlace);
router.post('/confirm/:id',
    authMiddleware.checkAccessToken,
    bookingMiddleware.isHostId,
    bookingController.isApprovedBooking);
router.delete('/:id',
    bookingMiddleware.isIdPresent,
    authMiddleware.checkAccessToken,
    userMiddleware.checkUserRole(['ADMIN']),
    bookingController.deleteBooking);

export const bookingRouter = router;
