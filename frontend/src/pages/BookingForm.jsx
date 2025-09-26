import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

export default function BookingForm(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customerName:'', serviceType:'Basic Wash', date:'', timeSlot:'', duration:30, price:0, status:'Pending',
    carDetails: { make:'', model:'', year:'', type:'' }, addOns: []
  });

  useEffect(() => {
    if (id) {
      api.get(`/${id}`).then(res => {
        const b = res.data.data;
        setForm({
          ...form,
          customerName: b.customerName || '',
          serviceType: b.serviceType || 'Basic Wash',
          date: b.date ? new Date(b.date).toISOString().slice(0,16) : '',
          timeSlot: b.timeSlot || '',
          duration: b.duration || 30,
          price: b.price || 0,
          status: b.status || 'Pending',
          carDetails: b.carDetails || { make:'', model:'', year:'', type:'' },
          addOns: b.addOns || []
        });
      });
    }
    // eslint-disable-next-line
  }, [id]);

  const handle = (path, value) => {
    if (path.startsWith('carDetails.')) {
      const key = path.split('.')[1];
      setForm(f => ({ ...f, carDetails: { ...f.carDetails, [key]: value } }));
    } else {
      setForm(f => ({ ...f, [path]: value }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      date: form.date ? new Date(form.date) : null
    };
    try {
      if (id) {
        await api.put(`/${id}`, payload);
        alert('Updated');
      } else {
        await api.post('/', payload);
        alert('Created');
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Error saving');
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="card">
        <div className="form-row">
          <label>Customer Name</label>
          <input value={form.customerName} onChange={e=>handle('customerName', e.target.value)} required />
        </div>

        <div className="form-row">
          <label>Car Make</label>
          <input value={form.carDetails.make} onChange={e=>handle('carDetails.make', e.target.value)} />
        </div>

        <div className="form-row">
          <label>Car Model</label>
          <input value={form.carDetails.model} onChange={e=>handle('carDetails.model', e.target.value)} />
        </div>

        <div className="form-row">
          <label>Car Type</label>
          <select value={form.carDetails.type} onChange={e=>handle('carDetails.type', e.target.value)}>
            <option value="">Select</option>
            <option value="sedan">sedan</option>
            <option value="suv">suv</option>
            <option value="hatchback">hatchback</option>
            <option value="luxury">luxury</option>
          </select>
        </div>

        <div className="form-row">
          <label>Service Type</label>
          <select value={form.serviceType} onChange={e=>handle('serviceType', e.target.value)}>
            <option>Basic Wash</option><option>Deluxe Wash</option><option>Full Detailing</option>
          </select>
        </div>

        <div className="form-row">
          <label>Date & Time</label>
          <input type="datetime-local" value={form.date} onChange={e=>handle('date', e.target.value)} />
        </div>

        <div className="form-row">
          <label>Time Slot</label>
          <input value={form.timeSlot} onChange={e=>handle('timeSlot', e.target.value)} />
        </div>

        <div className="form-row">
          <label>Duration (minutes)</label>
          <input type="number" value={form.duration} onChange={e=>handle('duration', Number(e.target.value))} />
        </div>

        <div className="form-row">
          <label>Price (₹)</label>
          <input type="number" value={form.price} onChange={e=>handle('price', Number(e.target.value))} />
        </div>

        <div className="form-row">
          <label>Status</label>
          <select value={form.status} onChange={e=>handle('status', e.target.value)}>
            <option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option>
          </select>
        </div>

        <div style={{display:'flex', gap:8}}>
          <button className="btn" type="submit">Save</button>
          <button className="btn" type="button" onClick={()=>navigate('/')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
