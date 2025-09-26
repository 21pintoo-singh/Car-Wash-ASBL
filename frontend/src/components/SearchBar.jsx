import React from 'react';

export default function SearchBar({ q, setQ, onSearch }) {
  return (
    <div style={{display:'flex', gap:8}}>
      <input className="search" placeholder="Search by customer or car" value={q} onChange={e => setQ(e.target.value)} />
      <button className="btn" onClick={onSearch}>Search</button>
    </div>
  );
}
