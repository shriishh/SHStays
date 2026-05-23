import React, { useState } from 'react';

export default function CompareModal({ 
  comparedItems, 
  onClose, 
  onRemove, 
  onBook,
  onOpenAIPlannerWithProp
}) {
  const [mobileIndex, setMobileIndex] = useState(0);

  if (comparedItems.length === 0) return null;

  // Formatting helpers
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Smart highlights calculations
  const lowestPrice = Math.min(...comparedItems.map(item => item.price));
  const highestRating = Math.max(...comparedItems.map(item => item.rating));
  
  // Best Value = lowest price per guest capacity ratio
  const bestValueRatio = Math.min(...comparedItems.map(item => item.price / item.guests));
  const bestValueItem = comparedItems.find(item => (item.price / item.guests) === bestValueRatio);

  const getSmartBadge = (item) => {
    if (item.price === lowestPrice) {
      return <span className="highlight-badge badge-lowest-price">💰 Lowest Price</span>;
    }
    if (item.rating === highestRating) {
      return <span className="highlight-badge badge-highest-rated">⭐ Highest Rated</span>;
    }
    if (item._id === bestValueItem?._id) {
      return <span className="highlight-badge badge-best-value">🏆 Best Value</span>;
    }
    return null;
  };

  // Finding stay recommendations for AI
  const romanticStay = comparedItems.find(item => item.bestFor?.toLowerCase().includes('romantic') || item.bestFor?.toLowerCase().includes('couples') || item.rating >= 4.9) || comparedItems[0];
  const adventureStay = comparedItems.find(item => item.bestFor?.toLowerCase().includes('hike') || item.bestFor?.toLowerCase().includes('stargazing') || item.guests >= 4) || comparedItems[comparedItems.length - 1] || comparedItems[0];

  const handleNextMobile = () => {
    setMobileIndex((prev) => (prev + 1) % comparedItems.length);
  };

  const handlePrevMobile = () => {
    setMobileIndex((prev) => (prev - 1 + comparedItems.length) % comparedItems.length);
  };

  return (
    <div className="compare-modal-overlay">
      <div className="compare-modal">
        <div className="compare-modal-header">
          <h2 className="compare-modal-title">Compare Listings <span>⇄</span></h2>
          <button className="compare-modal-close" onClick={onClose} aria-label="Close Comparison modal">
            &times;
          </button>
        </div>

        <div className="compare-modal-content">
          {/* AI Stay Recommendations Panel (NEW FEATURE) */}
          {comparedItems.length >= 2 && (
            <div style={{ background: 'var(--bg-beige)', border: '1px solid var(--color-gold)', borderRadius: '16px', padding: '1.2rem 1.5rem', marginBottom: '1.5rem', boxShadow: 'var(--shadow-soft)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', color: 'var(--color-brown)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
                <span>🪄</span> AI Stay Concierge Recommendations
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderRight: '1px dashed rgba(200, 168, 138, 0.4)', paddingRight: '1.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-gold)', textTransform: 'uppercase' }}>💖 Best Stay for Couples & Quietness</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-charcoal)', fontSize: '0.95rem' }}>{romanticStay.name}</span>
                    <button 
                      onClick={() => onOpenAIPlannerWithProp(romanticStay)}
                      style={{ fontSize: '0.75rem', background: 'var(--color-brown)', color: 'var(--bg-cream)', padding: '0.4rem 0.8rem', borderRadius: '12px', fontWeight: 600 }}
                    >
                      Plan Itinerary 🪄
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-gold)', textTransform: 'uppercase' }}>⛰️ Best Stay for Hiking & Adventure</span>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-charcoal)', fontSize: '0.95rem' }}>{adventureStay.name}</span>
                    <button 
                      onClick={() => onOpenAIPlannerWithProp(adventureStay)}
                      style={{ fontSize: '0.75rem', background: 'var(--color-brown)', color: 'var(--bg-cream)', padding: '0.4rem 0.8rem', borderRadius: '12px', fontWeight: 600 }}
                    >
                      Plan Itinerary 🪄
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Table View */}
          <div className="compare-table-container">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="compare-feature-column">Feature</th>
                  {comparedItems.map(item => (
                    <th key={item._id} className="compare-prop-header">
                      <img src={item.image} alt={item.name} className="compare-header-img" />
                      <div className="compare-header-title">{item.name}</div>
                      <div className="compare-header-loc">{item.location}</div>
                      {getSmartBadge(item)}
                      <div>
                        <button className="btn-compare-remove" onClick={() => onRemove(item._id)}>
                          Remove
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="compare-feature-column">Price / Night</td>
                  {comparedItems.map(item => (
                    <td key={item._id} style={{ fontWeight: 600, color: '#2E2A26' }}>
                      {formatPrice(item.price)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-feature-column">Rating</td>
                  {comparedItems.map(item => (
                    <td key={item._id} style={{ fontWeight: 600 }}>
                      ⭐ {item.rating} <span style={{ fontWeight: 400, fontSize: '0.8rem' }}>({item.reviewsCount})</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-feature-column">Guests</td>
                  {comparedItems.map(item => (
                    <td key={item._id}>{item.guests} Guests</td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-feature-column">Bedrooms</td>
                  {comparedItems.map(item => (
                    <td key={item._id}>{item.bedrooms} {item.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}</td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-feature-column">Bathrooms</td>
                  {comparedItems.map(item => (
                    <td key={item._id}>{item.bathrooms} {item.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}</td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-feature-column">Amenities</td>
                  {comparedItems.map(item => (
                    <td key={item._id}>
                      <div className="amenities-list-compare">
                        {item.amenities.map((amenity, i) => (
                          <span key={i} className="amenity-tag">{amenity}</span>
                        ))}
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-feature-column">Location</td>
                  {comparedItems.map(item => (
                    <td key={item._id}>{item.location}</td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-feature-column">Distance to Park</td>
                  {comparedItems.map(item => (
                    <td key={item._id}>{item.distanceToPark}</td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-feature-column">Cancellation</td>
                  {comparedItems.map(item => (
                    <td key={item._id} style={{ fontStyle: 'italic' }}>{item.cancellation}</td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-feature-column">Host Rating</td>
                  {comparedItems.map(item => (
                    <td key={item._id}>⭐ {item.hostRating}</td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-feature-column">Best For</td>
                  {comparedItems.map(item => (
                    <td key={item._id} style={{ color: '#8B5E3C', fontWeight: 500 }}>
                      {item.bestFor || 'Comfort & Retreat'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="compare-feature-column">Reserve</td>
                  {comparedItems.map(item => (
                    <td key={item._id}>
                      <button className="btn-book-now" onClick={() => onBook(item)}>
                        Book Now
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Swipe View */}
          <div className="mobile-compare-view">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <button 
                onClick={handlePrevMobile}
                style={{ fontSize: '1.5rem', padding: '0.5rem', background: '#E6D7C3', borderRadius: '50%' }}
              >
                &larr;
              </button>
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#8B5E3C', fontWeight: 600 }}>
                  Property {mobileIndex + 1} of {comparedItems.length}
                </span>
                <h3 className="brand-text" style={{ fontSize: '1.4rem', marginTop: '4px' }}>
                  {comparedItems[mobileIndex].name}
                </h3>
              </div>
              <button 
                onClick={handleNextMobile}
                style={{ fontSize: '1.5rem', padding: '0.5rem', background: '#E6D7C3', borderRadius: '50%' }}
              >
                &rarr;
              </button>
            </div>

            <div className="mobile-compare-slider">
              <div className="mobile-compare-card">
                <img 
                  src={comparedItems[mobileIndex].image} 
                  alt={comparedItems[mobileIndex].name} 
                  style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1rem' }}
                />
                
                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  {getSmartBadge(comparedItems[mobileIndex])}
                </div>

                <div className="mobile-card-row">
                  <span className="mobile-row-label">Price / Night</span>
                  <span className="mobile-row-val" style={{ fontWeight: 600, color: '#2E2A26' }}>
                    {formatPrice(comparedItems[mobileIndex].price)}
                  </span>
                </div>

                <div className="mobile-card-row">
                  <span className="mobile-row-label">Rating</span>
                  <span className="mobile-row-val" style={{ fontWeight: 600 }}>
                    ⭐ {comparedItems[mobileIndex].rating} ({comparedItems[mobileIndex].reviewsCount})
                  </span>
                </div>

                <div className="mobile-card-row">
                  <span className="mobile-row-label">Guests Limit</span>
                  <span className="mobile-row-val">{comparedItems[mobileIndex].guests} Guests</span>
                </div>

                <div className="mobile-card-row">
                  <span className="mobile-row-label">Space</span>
                  <span className="mobile-row-val">
                    {comparedItems[mobileIndex].bedrooms} BR / {comparedItems[mobileIndex].bathrooms} BA
                  </span>
                </div>

                <div className="mobile-card-row" style={{ flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <span className="mobile-row-label">Amenities</span>
                  <div className="amenities-list-compare" style={{ justifyContent: 'flex-start' }}>
                    {comparedItems[mobileIndex].amenities.map((amenity, i) => (
                      <span key={i} className="amenity-tag">{amenity}</span>
                    ))}
                  </div>
                </div>

                <div className="mobile-card-row">
                  <span className="mobile-row-label">Location</span>
                  <span className="mobile-row-val">{comparedItems[mobileIndex].location}</span>
                </div>

                <div className="mobile-card-row">
                  <span className="mobile-row-label">Distance to JT NP</span>
                  <span className="mobile-row-val">{comparedItems[mobileIndex].distanceToPark}</span>
                </div>

                <div className="mobile-card-row">
                  <span className="mobile-row-label">Cancellation</span>
                  <span className="mobile-row-val" style={{ fontStyle: 'italic' }}>
                    {comparedItems[mobileIndex].cancellation}
                  </span>
                </div>

                <div className="mobile-card-row">
                  <span className="mobile-row-label">Best For</span>
                  <span className="mobile-row-val" style={{ color: '#8B5E3C', fontWeight: 500 }}>
                    {comparedItems[mobileIndex].bestFor || 'Retreat'}
                  </span>
                </div>

                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
                  <button 
                    className="btn-book-now" 
                    style={{ flexGrow: 1, padding: '0.8rem' }}
                    onClick={() => onBook(comparedItems[mobileIndex])}
                  >
                    Book Stay
                  </button>
                  <button 
                    className="btn-compare-remove" 
                    style={{ background: 'rgba(217, 56, 56, 0.1)', padding: '0.8rem', borderRadius: '12px', marginTop: 0 }}
                    onClick={() => {
                      const id = comparedItems[mobileIndex]._id;
                      if (comparedItems.length === 1) {
                        onClose();
                      } else {
                        setMobileIndex(0);
                      }
                      onRemove(id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className="slider-dots">
              {comparedItems.map((_, i) => (
                <div 
                  key={i} 
                  className={`slider-dot ${mobileIndex === i ? 'active' : ''}`}
                  onClick={() => setMobileIndex(i)}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
