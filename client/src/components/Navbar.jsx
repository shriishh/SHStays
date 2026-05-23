import React, { useState } from 'react';

export default function Navbar({ 
  wishlistCount, 
  compareCount, 
  onShowWishlistOnly, 
  showWishlistOnly,
  onOpenCompare,
  onOpenAIPlanner
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogoClick = (e) => {
    e.preventDefault();
    onShowWishlistOnly(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <a href="/" className="nav-logo" onClick={handleLogoClick}>
        <span className="logo-main">SHStays</span>
        <span className="logo-sub">Stay. Explore. Retreat.</span>
      </a>

      <ul className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`} style={mobileMenuOpen ? { display: 'flex', flexDirection: 'column', position: 'absolute', top: '70px', left: 0, right: 0, background: '#F3EDE3', padding: '1.5rem', borderBottom: '1px solid rgba(200,168,138,0.3)', gap: '1.5rem', zIndex: 99 } : {}}>
        <li><a href="#stays" className="nav-link" onClick={() => { onShowWishlistOnly(false); setMobileMenuOpen(false); }}>Stays</a></li>
        <li><a href="#planner" className="nav-link" onClick={(e) => { e.preventDefault(); onOpenAIPlanner(); setMobileMenuOpen(false); }} style={{ color: '#8B5E3C', fontWeight: 600 }}>🪄 AI Planner</a></li>
        <li><a href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a></li>
        <li><a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
      </ul>

      <div className="nav-icons">
        <button 
          className={`nav-icon-btn ${showWishlistOnly ? 'active' : ''}`} 
          onClick={() => onShowWishlistOnly(!showWishlistOnly)}
          title={showWishlistOnly ? "Show All Stays" : "Show Favorites"}
          style={showWishlistOnly ? { color: '#D93838', background: 'rgba(217, 56, 56, 0.1)' } : {}}
        >
          {showWishlistOnly ? '♥' : '♡'}
          {wishlistCount > 0 && <span className="icon-badge">{wishlistCount}</span>}
        </button>

        <button 
          className="nav-icon-btn" 
          onClick={onOpenCompare}
          disabled={compareCount === 0}
          title="Compare Listings"
          style={compareCount > 0 ? { color: '#8B5E3C' } : { opacity: 0.6, cursor: 'not-allowed' }}
        >
          ⇄
          {compareCount > 0 && <span className="icon-badge">{compareCount}</span>}
        </button>

        <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          ☰
        </button>
      </div>
    </nav>
  );
}
