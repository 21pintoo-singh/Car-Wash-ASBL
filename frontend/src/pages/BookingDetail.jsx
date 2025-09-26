import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function BookingDetail(){
  const { id } = useParams();
  const [b, setB] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/${id}`).then(res => setB(res.data.data)).catch(err => console.error(err));
  }, [id]);

  const onDelete = async () => {
    if (!window.confirm('Delete this booking?')) return;
    await api.delete(`/${id}`);
    alert('Deleted');
    navigate('/');
  };

  if (!b) return <div>Loading...</div>;

  return (
    <div>
      <div className="card">
        <h2>{b.customerName}</h2>
        <div className="small">{b.carDetails.make} {b.carDetails.model} • {b.carDetails.type}</div>
        <div className="small">Service: {b.serviceType}</div>
        <div className="small">Date: {new Date(b.date).toLocaleString()} • {b.timeSlot}</div>
        <div className="small">Duration: {b.duration} min • Price: ₹{b.price}</div>
        <div className="small">Status: {b.status}</div>
        <div style={{marginTop:12}}>
          <Link to={`/edit/${b._id}`} className="btn">Edit</Link>
          <button onClick={onDelete} style={{marginLeft:8}} className="btn">Delete</button>
        </div>
      </div>
    </div>
  );
}
