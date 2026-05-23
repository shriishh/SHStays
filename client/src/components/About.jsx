import React from 'react';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-text">
        <span className="about-subtitle">Why travelers love SHStays</span>
        <h2 className="about-title">A sanctuary designed to reconnect.</h2>
        <p className="about-description">
          SHStays represents a curated portfolio of desert properties designed to facilitate rest, connection, and visual inspiration. We blend luxury magazine styling with hand-selected rustic accents to create spaces that feel like home but inspire like art.
        </p>

        <div className="trust-badges">
          <div className="trust-badge-card">
            <span className="trust-badge-icon">🏠</span>
            <span className="trust-badge-title">Handpicked Homes</span>
            <span className="trust-badge-desc">Curated properties with heart, design focus, and premium comfort.</span>
          </div>

          <div className="trust-badge-card">
            <span className="trust-badge-icon">🔒</span>
            <span className="trust-badge-title">Seamless Booking</span>
            <span className="trust-badge-desc">Flexible dates, quick reservation system, and secure checks.</span>
          </div>

          <div className="trust-badge-card">
            <span className="trust-badge-icon">🤝</span>
            <span className="trust-badge-title">Trusted Hosts</span>
            <span className="trust-badge-desc">Local hospitality experts dedicated to making your stay magical.</span>
          </div>

          <div className="trust-badge-card">
            <span className="trust-badge-icon">📞</span>
            <span className="trust-badge-title">24/7 Concierge</span>
            <span className="trust-badge-desc">Instant online concierge support for trail, dining, and spa recommendations.</span>
          </div>
        </div>
      </div>

      <div className="about-img-container">
        <img 
          src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80" 
          alt="Luxury Joshua Tree Living Room Sunset" 
          className="about-img"
        />
      </div>
    </section>
  );
}
