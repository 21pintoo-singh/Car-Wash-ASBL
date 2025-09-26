import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import Booking from '../models/Booking.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGO = process.env.MONGO_URI || 'localhost://5000/carwashdb';

const seed = async () => {
  await connectDB(MONGO);

  // pehle purane data clear karo
  await Booking.deleteMany({});

  // sample data
  const data = [
    {
      customerName: 'Amit Verma',
      carDetails: { make: 'Toyota', model: 'Corolla', year: 2018, type:'sedan' },
      serviceType: 'Basic Wash',
      date: new Date(Date.now() - 2 * 24 * 3600 * 1000),
      timeSlot: '10:00-11:00',
      duration: 30,
      price: 300,
      status: 'Completed',
      rating: 4
    },
    {
      customerName: 'Neha Sharma',
      carDetails: { make: 'Hyundai', model: 'Creta', year: 2020, type:'suv' },
      serviceType: 'Deluxe Wash',
      date: new Date(),
      timeSlot: '13:00-14:00',
      duration: 45,
      price: 600,
      status: 'Confirmed'
    },
    {
      customerName: 'Rohit Singh',
      carDetails: { make: 'Maruti', model: 'Swift', year: 2017, type:'hatchback' },
      serviceType: 'Full Detailing',
      date: new Date(Date.now() + 3 * 24 * 3600 * 1000),
      timeSlot: '09:00-11:00',
      duration: 120,
      price: 2000,
      status: 'Pending'
    },
    {
      customerName: 'Priya Patel',
      carDetails: { make: 'BMW', model: '5 Series', year: 2019, type:'luxury' },
      serviceType: 'Full Detailing',
      date: new Date(Date.now() + 7 * 24 * 3600 * 1000),
      timeSlot: '15:00-18:00',
      duration: 180,
      price: 5000,
      status: 'Pending'
    },
    {
      customerName: 'Suresh Kumar',
      carDetails: { make: 'Honda', model: 'City', year: 2016, type:'sedan' },
      serviceType: 'Deluxe Wash',
      date: new Date(Date.now() - 5 * 24 * 3600 * 1000),
      timeSlot: '11:00-12:30',
      duration: 60,
      price: 750,
      status: 'Completed',
      rating: 5
    }
  ];

  await Booking.insertMany(data);
  console.log('✅ Seeded bookings');
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
