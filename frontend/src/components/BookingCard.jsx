import React from 'react';
import { Link } from 'react-router-dom';

export default function BookingCard({ b }) {
  return (
    <div className="card">
      <h3>{b.customerName}</h3>
      <div className="small">{b.carDetails?.make} {b.carDetails?.model} ({b.carDetails?.type})</div>
      <div className="small">Service: {b.serviceType} • {b.timeSlot} • {b.duration} min</div>
      <div style={{marginTop:8, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <strong>₹{b.price}</strong>
          <div className="small">Status: {b.status}</div>
        </div>
        <div style={{textAlign:'right'}}>
          <Link to={`/booking/${b._id}`} className="btn">View</Link>
        </div>
      </div>
    </div>
  );
}
