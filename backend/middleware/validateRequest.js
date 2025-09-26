// validateRequest.js
import { body, validationResult } from 'express-validator';

export const bookingValidationRules = () => {
  return [
    body('customerName').notEmpty().withMessage('customerName is required'),
    body('serviceType').optional().isIn(['Basic Wash', 'Deluxe Wash', 'Full Detailing']),
    body('duration').optional().isInt({ min: 5 }),
    body('price').optional().isFloat({ min: 0 }),
    body('status').optional().isIn(['Pending', 'Confirmed', 'Completed', 'Cancelled']),
    body('date').optional().isISO8601().toDate()
  ];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ success:false, errors: errors.array() });
  }
  next();
};
