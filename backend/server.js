import dotenv from 'dotenv';
import express, { json } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import bookingsRouter from './routes/bookings.js';
//import errorHandler from './middleware/errorHandler.js';
import { errorHandler } from './middleware/errorHandler.js';



dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://21pintoo-singh:S0Uw8LhNlYRyHfiq@cluster1.k5nsu.mongodb.net/carwashdb';

connectDB(MONGO_URI);

app.use(cors());
app.use(json());
app.use(morgan('dev'));

app.use('/api/bookings', bookingsRouter);

// basic health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// error middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
