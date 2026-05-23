import React from 'react';

export default function Host() {
  return (
    <section id="host" className="host-section">
      <img 
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" 
        alt="Luna Vista Host Elena" 
        className="host-avatar"
      />
      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px', color: '#8B5E3C', fontWeight: 600 }}>
        Meet Your Host
      </span>
      <h2 className="host-title">Crafting desert stories since 2018</h2>
      <p className="host-story">
        "As your hosts, we seek to provide more than a roof. We curate homes that invite the silent majesty of the desert landscape indoors, blending warm natural light, organic local textures, and premium stargazing decks. We hope your stay at Luna Vista is restorative, creative, and memorable."
      </p>
      <span className="host-sign">Elena & Samuel, Founders</span>
    </section>
  );
}
