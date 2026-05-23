import React, { useState } from 'react';

export default function Footer({ onSubscribe }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      onSubscribe(email);
      setEmail('');
    }
  };

  return (
    <footer id="contact" className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-logo-main">SHStays</span>
            <span className="footer-logo-sub">Stay. Explore. Retreat.</span>
          </div>
          <p className="footer-desc">
            Discover extraordinary boutique stays that connect you deeply to the natural elegance of desert landscapes.
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link" title="Instagram">📸</a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="social-link" title="Pinterest">📌</a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-link" title="Facebook">👤</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-link" title="YouTube">📺</a>
          </div>
        </div>

        <div className="footer-column">
          <h4 className="footer-col-title">Explore</h4>
          <ul className="footer-col-links">
            <li><a href="#stays">Stays</a></li>
            <li><a href="#about">Experiences</a></li>
            <li><a href="#about">Destinations</a></li>
            <li><a href="#contact">Gift Cards</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-col-title">Company</h4>
          <ul className="footer-col-links">
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Careers</a></li>
            <li><a href="#about">Press</a></li>
            <li><a href="#about">Blog</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4 className="footer-col-title">Stay in the loop</h4>
          <p className="footer-desc" style={{ fontSize: '0.85rem' }}>
            Get curated travel inspirations, design highlights, and exclusive stay deals sent directly to your inbox.
          </p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-newsletter" title="Subscribe to newsletter">
              &rarr;
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} SHStays Retreats. All rights reserved.</span>
        <div className="footer-policies">
          <a href="#contact">Privacy Policy</a>
          <a href="#contact">Cancellation Policies</a>
          <a href="#contact">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
