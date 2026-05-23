import React, { useState, useEffect } from 'react';

export default function BookingModal({ property, onClose, onConfirm, onOpenAIPlanner }) {
  const [guestName, setGuestName] = useState('');
  const [checkIn, setCheckIn] = useState('2026-05-18');
  const [checkOut, setCheckOut] = useState('2026-05-22');
  const [guests, setGuests] = useState('2');
  const [nights, setNights] = useState(4);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [syncItinerary, setSyncItinerary] = useState(true);

  useEffect(() => {
    if (checkIn && checkOut) {
      const date1 = new Date(checkIn);
      const date2 = new Date(checkOut);
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        setNights(diffDays);
        setTotalAmount(diffDays * property.price);
      } else {
        setNights(0);
        setTotalAmount(0);
      }
    }
  }, [checkIn, checkOut, property.price]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!guestName) {
      alert('Please enter your name to confirm booking.');
      return;
    }
    if (nights <= 0) {
      alert('Check-out must be after Check-in.');
      return;
    }
    
    onConfirm({
      propertyId: property._id,
      guestName,
      checkIn,
      checkOut,
      guests,
      totalAmount
    });
    
    setIsSuccess(true);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">
        <div className="booking-modal-header">
          <h3 className="booking-modal-title">{isSuccess ? 'Reservation Complete' : 'Book Your Stay'}</h3>
          <button className="compare-modal-close" onClick={onClose} aria-label="Close booking modal">
            &times;
          </button>
        </div>

        {isSuccess ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem', padding: '1rem 0', textAlign: 'center' }}>
            <span style={{ fontSize: '3rem' }}>🏜️</span>
            <h4 className="brand-text" style={{ fontSize: '1.6rem', color: '#2E2A26' }}>
              Your Desert Journey Begins!
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#4A443E', lineHeight: '1.5' }}>
              Congratulations, traveler. Your stay at <strong>{property.name}</strong> has been scheduled successfully.<br />
              A confirmation summary has been synced to your dashboard.
            </p>

            {syncItinerary && (
              <div style={{ background: 'var(--bg-beige)', border: '1px solid var(--color-gold)', padding: '1rem', borderRadius: '12px', width: '100%' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-brown)' }}>
                  🪄 AI Itinerary Auto-Synced
                </span>
                <p style={{ fontSize: '0.75rem', color: '#4A443E', marginTop: '4px', lineHeight: '1.3' }}>
                  A custom mood-matched itinerary including trail options, weather updates, and meal bookings has been built for this trip.
                </p>
                <button 
                  onClick={() => {
                    onClose();
                    onOpenAIPlanner(property);
                  }}
                  style={{ 
                    marginTop: '0.8rem', 
                    background: 'var(--color-brown)', 
                    color: 'var(--bg-cream)', 
                    fontSize: '0.75rem', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '12px', 
                    fontWeight: 600,
                    width: '100%' 
                  }}
                >
                  View Synced AI Itinerary 🪄
                </button>
              </div>
            )}

            <button 
              onClick={onClose} 
              style={{ fontSize: '0.85rem', textDecoration: 'underline', color: '#8B5E3C', marginTop: '0.5rem' }}
            >
              Return to Homepage
            </button>
          </div>
        ) : (
          <form className="booking-form" onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
              <img 
                src={property.image} 
                alt={property.name} 
                style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#2E2A26' }}>
                  {property.name}
                </h4>
                <span style={{ fontSize: '0.8rem', color: '#8B5E3C' }}>{property.location}</span>
              </div>
            </div>

            <div className="booking-input-group">
              <label htmlFor="booking-name">Your Full Name</label>
              <input 
                id="booking-name"
                type="text" 
                placeholder="Enter your name" 
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="booking-input-group">
                <label htmlFor="booking-in">Check in</label>
                <input 
                  id="booking-in"
                  type="date" 
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  required
                />
              </div>
              <div className="booking-input-group">
                <label htmlFor="booking-out">Check out</label>
                <input 
                  id="booking-out"
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="booking-input-group">
              <label htmlFor="booking-guests">Number of Guests</label>
              <select 
                id="booking-guests"
                value={guests} 
                onChange={(e) => setGuests(e.target.value)}
              >
                <option value="1">1 Guest</option>
                <option value="2">2 Guests</option>
                <option value="3">3 Guests</option>
                <option value="4">4 Guests</option>
                <option value="5">5 Guests</option>
                <option value="6">6 Guests</option>
              </select>
            </div>

            <div className="booking-summary-box">
              <div className="booking-summary-row">
                <span>Price per night</span>
                <span>{formatPrice(property.price)}</span>
              </div>
              <div className="booking-summary-row">
                <span>Nights count</span>
                <span>{nights} nights</span>
              </div>
              <div className="booking-total-row">
                <span>Estimated Total</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', margin: '0.2rem 0' }}>
              <input 
                type="checkbox" 
                id="sync-itinerary"
                checked={syncItinerary} 
                onChange={(e) => setSyncItinerary(e.target.checked)} 
                style={{ width: '16px', height: '16px', accentColor: 'var(--color-brown)' }}
              />
              <label htmlFor="sync-itinerary" style={{ fontSize: '0.75rem', color: '#4A443E', cursor: 'pointer' }}>
                🪄 Auto-generate and sync AI Itinerary for this trip!
              </label>
            </div>

            <button type="submit" className="btn-confirm-booking">
              Confirm Reservation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
