import React, { useEffect, useState } from 'react';
import api from '../api';
import BookingCard from '../components/BookingCard';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [bookings, setBookings] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ serviceType:'', status:'', carType:'' });

  const fetchData = async (opts = {}) => {
    setLoading(true);
    try {
      const params = { page, limit, ...filters, ...opts };
      if (q) {
        const res = await api.get('/search', { params: { q, page, limit } });
        setBookings(res.data.data);
        setTotal(res.data.meta.total || 0);
      } else {
        const res = await api.get('/', { params });
        setBookings(res.data.data);
        setTotal(res.data.meta.total || 0);
      }
    } catch (err) {
      console.error(err);
      alert('Error loading bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [page, filters]);

  const onSearch = () => { setPage(1); fetchData(); };

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', marginBottom:12, gap:12}}>
        <SearchBar q={q} setQ={setQ} onSearch={onSearch} />
        <div>
          <select value={filters.serviceType} onChange={e => setFilters({...filters, serviceType:e.target.value})}>
            <option value="">All Services</option>
            <option>Basic Wash</option>
            <option>Deluxe Wash</option>
            <option>Full Detailing</option>
          </select>
          <select value={filters.status} onChange={e => setFilters({...filters, status:e.target.value})} style={{marginLeft:8}}>
            <option value="">All Status</option>
            <option>Pending</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option>
          </select>
          <select value={filters.carType} onChange={e => setFilters({...filters, carType:e.target.value})} style={{marginLeft:8}}>
            <option value="">Any Car Type</option>
            <option value="sedan">sedan</option>
            <option value="suv">suv</option>
            <option value="hatchback">hatchback</option>
            <option value="luxury">luxury</option>
          </select>
        </div>
      </div>

      {loading ? <div>Loading...</div> : (
        <>
          <div className="grid">
            {bookings.map(b => <BookingCard key={b._id} b={b} />)}
          </div>

          <div className="pagination">
            <button disabled={page<=1} onClick={() => setPage(p=>p-1)}>Prev</button>
            <div className="small">Page {page} • Total: {total}</div>
            <button disabled={page*limit >= total} onClick={() => setPage(p=>p+1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}
