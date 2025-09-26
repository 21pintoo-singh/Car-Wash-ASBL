import { Schema, model as _model } from 'mongoose';

const CarDetailsSchema = new Schema({
  make: { type: String },
  model: { type: String },
  year: { type: Number },
  type: { type: String } // sedan, suv, hatchback, luxury
}, { _id: false });

const BookingSchema = new Schema({
  customerName: { type: String, required: true, trim: true },
  carDetails: { type: CarDetailsSchema, default: {} },
  serviceType: { type: String, enum: ['Basic Wash', 'Deluxe Wash', 'Full Detailing'], default: 'Basic Wash' },
  date: { type: Date },
  timeSlot: { type: String }, // e.g. "10:00-11:00"
  duration: { type: Number }, // minutes
  price: { type: Number, default: 0 },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'], default: 'Pending' },
  rating: { type: Number, min: 1, max: 5 },
  addOns: { type: [String], default: [] },
}, { timestamps: true });

BookingSchema.index({ customerName: 'text', 'carDetails.make': 'text', 'carDetails.model': 'text' });

export default _model('Booking', BookingSchema);
