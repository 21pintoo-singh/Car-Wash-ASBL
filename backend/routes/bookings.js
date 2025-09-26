import { Router } from 'express';
const router = Router();
import { listBookings, searchBookings, getBooking, createBooking, updateBooking, deleteBooking } from '../controllers/bookingController.js';
import { bookingValidationRules, validate } from '../middleware/validateRequest.js';

// List with filters & pagination
router.get('/', listBookings);
router.get('/search', searchBookings);
router.get('/:id', getBooking);
router.post('/', bookingValidationRules(), validate, createBooking);
router.put('/:id', bookingValidationRules(), validate, updateBooking);
router.delete('/:id', deleteBooking);

export default router;
