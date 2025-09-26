C:\Users\Pintoo Singh\Desktop\Projects code\Car-Wash-ASBL\README.md# Car Washing Booking - MERN Assessment

## Overview
MERN app for booking and managing car wash services. Features:
- CRUD bookings
- Search by customer and car
- Filters by service, status, car type
- Pagination
- Seed data included

## Tech
- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, React Router, Axios

## Run backend
1. cd backend
2. cp .env.example .env and set MONGO_URI if needed
3. npm install
4. npm run seed   # seeds sample bookings
5. npm run dev    # or npm start

## Run frontend
1. cd frontend
2. npm install
3. Create .env with REACT_APP_API_BASE=http://localhost:5000/api
4. npm start

## Notes
- No auth (per assessment)
- Index created for text search on customerName and car details
- To generate screenshots: run app and capture homepage, detail, add/edit, search results, mobile views.

