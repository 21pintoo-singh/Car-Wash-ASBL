import React from 'react';

import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import BookingDetail from './pages/BookingDetail';
import BookingForm from './pages/BookingForm';

function App() {
  return (
    <div className="app">
      <header className="header">
        <Link to="/"><h1>CarWash Booking</h1></Link>
        <Link className="btn" to="/add">+ Add Booking</Link>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:id" element={<BookingDetail />} />
          <Route path="/add" element={<BookingForm />} />
          <Route path="/edit/:id" element={<BookingForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
