import React from 'react';

export default function Hero({ onOpenAIPlanner }) {
  const handleScrollToStays = () => {
    const section = document.getElementById('stays');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <img 
        src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1800&q=80" 
        alt="Celestial Joshua Tree Desert Sunset" 
        className="hero-img" 
      />
      
      <div className="hero-content">
        <h1 className="hero-title">A celestial retreat in the heart of Joshua Tree.</h1>
        <p className="hero-subtitle">Stay in handpicked homes that blend nature, comfort, and unforgettable experiences.</p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={handleScrollToStays}>
            Explore Stays &rarr;
          </button>
          <button 
            className="btn-primary" 
            onClick={onOpenAIPlanner}
            style={{ 
              backgroundColor: 'transparent', 
              border: '1px solid var(--bg-cream)', 
              color: 'var(--bg-cream)',
              boxShadow: 'none'
            }}
          >
            Plan My Trip with AI 🪄
          </button>
        </div>
      </div>

      <div className="scroll-indicator" onClick={handleScrollToStays} style={{ cursor: 'pointer' }}>
        <span>Scroll to explore</span>
        <div className="scroll-arrow">
          <span>&darr;</span>
        </div>
      </div>
    </section>
  );
}
