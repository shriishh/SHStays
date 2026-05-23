import React from 'react';

export default function PropertyCard({ 
  property, 
  isWishlisted, 
  isCompared, 
  onToggleWishlist, 
  onToggleCompare 
}) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="property-card">
      <div className="card-img-container">
        <span className="card-location-tag">{property.location}</span>
        <button 
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={() => onToggleWishlist(property._id)}
          aria-label={isWishlisted ? "Remove from favorites" : "Save to favorites"}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>
        <img 
          src={property.image} 
          alt={property.name} 
          className="card-img" 
        />
      </div>

      <div className="card-details">
        <div className="card-meta">
          <span className="card-type">{property.type}</span>
          <span className="card-rating">
            <span className="star-icon">★</span> {property.rating} <span style={{ fontWeight: 400, color: '#4A443E', fontSize: '0.75rem' }}>({property.reviewsCount})</span>
          </span>
        </div>

        <h3 className="card-title">{property.name}</h3>

        <div className="card-footer">
          <div className="card-price">
            <span className="price-num">{formatPrice(property.price)}</span>
            <span className="price-unit">/ night</span>
          </div>

          <button 
            className={`compare-btn ${isCompared ? 'active' : ''}`}
            onClick={() => onToggleCompare(property)}
            title={isCompared ? "Remove from comparison" : "Add to comparison"}
            aria-label="Toggle comparison"
          >
            ⇄
          </button>
        </div>
      </div>
    </div>
  );
}
