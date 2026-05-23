import React, { useState } from 'react';

export default function SearchBar({ onSearch }) {
  const [search, setSearch] = useState('');
  const [checkIn, setCheckIn] = useState('2026-05-18');
  const [checkOut, setCheckOut] = useState('2026-05-22');
  const [guests, setGuests] = useState('2');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ search, guests, checkIn, checkOut });
  };

  return (
    <div className="search-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="search-field">
          <label htmlFor="search-loc">Where</label>
          <input 
            id="search-loc"
            type="text" 
            placeholder="Joshua Tree, CA" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="search-field">
          <label htmlFor="search-in">Check in</label>
          <input 
            id="search-in"
            type="date" 
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div className="search-field">
          <label htmlFor="search-out">Check out</label>
          <input 
            id="search-out"
            type="date" 
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <div className="search-field">
          <label htmlFor="search-guests">Guests</label>
          <select 
            id="search-guests"
            value={guests} 
            onChange={(e) => setGuests(e.target.value)}
          >
            <option value="">Any guests</option>
            <option value="1">1 Adult</option>
            <option value="2">2 Adults, 1 Child</option>
            <option value="3">3 Adults</option>
            <option value="4">4 Adults</option>
            <option value="6">6 Adults</option>
          </select>
        </div>

        <button type="submit" className="btn-search" title="Search available properties">
          🔍
        </button>
      </form>
    </div>
  );
}
