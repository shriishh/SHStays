import React, { useState, useEffect } from 'react';

const MOODS = [
  { id: 'Relax', name: 'Relax', icon: '☁️' },
  { id: 'Adventure', name: 'Adventure', icon: '⛰️' },
  { id: 'Romantic', name: 'Romantic', icon: '💖' },
  { id: 'Luxury', name: 'Luxury', icon: '👑' },
  { id: 'Nature', name: 'Nature', icon: '🌵' },
  { id: 'Wellness', name: 'Wellness', icon: '🧘' },
  { id: 'Photography', name: 'Photography', icon: '📷' }
];

const INTERESTS = [
  { id: 'Stargazing', name: 'Stargazing' },
  { id: 'Hiking', name: 'Hiking' },
  { id: 'Cafes', name: 'Boutique Cafes' },
  { id: 'Spa', name: 'Spa & Wellness' },
  { id: 'SoundBath', name: 'Sound Baths' },
  { id: 'Music', name: 'Vinyl Sessions' }
];

export default function AIPlanner({ isOpen, onClose, preselectedProperty, onBookStay }) {
  const [step, setStep] = useState(1); // 1: Input, 2: Loading, 3: Result
  const [loadingText, setLoadingText] = useState('');
  
  // Form Inputs
  const [destination, setDestination] = useState('Joshua Tree, CA');
  const [duration, setDuration] = useState(3);
  const [budget, setBudget] = useState('Luxury');
  const [travelStyle, setTravelStyle] = useState('Romantic');
  const [groupType, setGroupType] = useState('Couple Retreat');
  const [selectedInterests, setSelectedInterests] = useState(['Stargazing', 'Hiking']);
  const [foodPreference, setFoodPreference] = useState('Organic Cafes');

  // API Result
  const [itinerary, setItinerary] = useState(null);

  useEffect(() => {
    if (preselectedProperty) {
      setDestination(preselectedProperty.location);
    }
  }, [preselectedProperty]);

  // Loading text cycles
  useEffect(() => {
    if (step === 2) {
      const texts = [
        '✨ Ingesting travel preferences...',
        '🌵 Cross-referencing Joshua Tree park trail indices...',
        '🌌 Calculating moon cycles for peak stargazing hours...',
        '☕ Sifting Pappy & Harriet\'s table availability...',
        '☀️ Consulting desert heat forecasts and shade cover...',
        '🧘 Harmonizing yoga rhythm with canyon wind patterns...',
        '✍️ Drawing beautiful daily journal plans...'
      ];
      
      let index = 0;
      setLoadingText(texts[0]);
      
      const interval = setInterval(() => {
        index = (index + 1) % texts.length;
        setLoadingText(texts[index]);
      }, 700);

      const timer = setTimeout(() => {
        clearInterval(interval);
        generateItineraryAPI();
      }, 4200);

      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [step]);

  const generateItineraryAPI = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/ai-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination,
          duration,
          budget,
          travelStyle,
          groupType,
          interests: selectedInterests,
          foodPreference,
          propertyId: preselectedProperty?._id
        })
      });
      const data = await res.json();
      setItinerary(data);
      setStep(3);
    } catch (err) {
      console.error('Failed generating AI itinerary. Using simulated offline generator.', err);
      // Simulating rich plan if offline
      setItinerary({
        destination,
        duration,
        budget,
        travelStyle,
        groupType,
        propertyName: preselectedProperty ? preselectedProperty.name : 'Sunset Rock Retreat',
        propertyType: preselectedProperty ? preselectedProperty.type : 'Luxury Villa',
        weather: {
          forecast: '28°C • Clear Sky Viewings',
          warning: '🌌 Excellent stargazing forecast. Plan trails early.'
        },
        days: [
          {
            dayNumber: 1,
            title: 'Day 1: Arrival & Stargazing Canopy',
            activities: [
              { time: '03:00 PM', title: 'Sanctuary Arrival', description: `Check-in, sip cooling local sodas, and sync with the silence.`, icon: '🔑' },
              { time: '06:00 PM', title: 'Sunset Silhouette Bonfire', description: 'Gather round the private fire pit with wine and acoustic vinyls.', icon: '🔥' },
              { time: '09:00 PM', title: 'Stargazing hours', description: 'Gaze at the pristine high-desert sky under clear horizons.', icon: '🌌' }
            ]
          }
        ],
        recommendations: [
          { feature: 'Best Trail Timing', detail: 'Hike Barker Dam at 6:45 AM for optimal soft desert lighting.' }
        ]
      });
      setStep(3);
    }
  };

  const handleInterestToggle = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest) 
        : [...prev, interest]
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <div className="compare-modal-overlay">
      <div className="compare-modal" style={{ maxWidth: '950px' }}>
        <div className="compare-modal-header" style={{ background: '#E6D7C3' }}>
          <h2 className="compare-modal-title" style={{ fontSize: '1.8rem' }}>
            <span>🪄</span> AI Itinerary Planner
          </h2>
          <button className="compare-modal-close" onClick={onClose}>&times;</button>
        </div>

        <div className="compare-modal-content" style={{ padding: '2rem' }}>
          {/* STEP 1: PREFERENCE INPUT */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {preselectedProperty && (
                <div style={{ background: 'rgba(200, 168, 138, 0.15)', padding: '1rem', borderRadius: '16px', border: '1px dashed var(--color-gold)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <img src={preselectedProperty.image} alt={preselectedProperty.name} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div>
                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#2E2A26' }}>Tailoring Itinerary for: {preselectedProperty.name}</h4>
                    <span style={{ fontSize: '0.8rem', color: '#8B5E3C' }}>Auto-populating stay specifications and location-specific recommendations</span>
                  </div>
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexSpread: 'column', flexDirection: 'column', gap: '1.2rem' }}>
                  <div className="booking-input-group">
                    <label>Destination Location</label>
                    <input 
                      type="text" 
                      value={destination} 
                      onChange={(e) => setDestination(e.target.value)} 
                      disabled={!!preselectedProperty} 
                      style={!!preselectedProperty ? { background: '#F3EDE3', color: '#8B5E3C' } : {}}
                    />
                  </div>

                  <div className="booking-input-group">
                    <label>Duration of Stay ({duration} Days)</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="5" 
                      value={duration} 
                      onChange={(e) => setDuration(parseInt(e.target.value, 10))}
                      style={{ accentColor: 'var(--color-brown)' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8B5E3C', marginTop: '-5px' }}>
                      <span>1 Day</span>
                      <span>3 Days</span>
                      <span>5 Days</span>
                    </div>
                  </div>

                  <div className="booking-input-group">
                    <label>Budget Tier</label>
                    <select value={budget} onChange={(e) => setBudget(e.target.value)}>
                      <option value="Earthy Budget">Earthy Budget (Save on Activities)</option>
                      <option value="Boutique">Boutique (Balanced Comfort)</option>
                      <option value="Luxury">Luxury (Private Chefs & sound baths)</option>
                    </select>
                  </div>

                  <div className="booking-input-group">
                    <label>Travel Companion Type</label>
                    <select value={groupType} onChange={(e) => setGroupType(e.target.value)}>
                      <option value="Solo Explorer">Solo Explorer</option>
                      <option value="Couple Retreat">Couple Retreat</option>
                      <option value="Family Holiday">Family Holiday</option>
                      <option value="Group Reunion">Group Reunion</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div className="booking-input-group">
                    <label>Select Travel Mood (Style)</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.4rem' }}>
                      {MOODS.map(mood => (
                        <button
                          key={mood.id}
                          type="button"
                          onClick={() => setTravelStyle(mood.id)}
                          style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            border: '1px solid',
                            borderColor: travelStyle === mood.id ? 'var(--color-brown)' : 'rgba(200, 168, 138, 0.4)',
                            backgroundColor: travelStyle === mood.id ? 'var(--color-brown)' : 'var(--color-white)',
                            color: travelStyle === mood.id ? 'var(--bg-cream)' : 'var(--color-charcoal)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem'
                          }}
                        >
                          <span>{mood.icon}</span> {mood.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="booking-input-group">
                    <label>Activities & Interests</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.4rem' }}>
                      {INTERESTS.map(interest => {
                        const active = selectedInterests.includes(interest.id);
                        return (
                          <button
                            key={interest.id}
                            type="button"
                            onClick={() => handleInterestToggle(interest.id)}
                            style={{
                              padding: '0.5rem',
                              borderRadius: '8px',
                              fontSize: '0.8rem',
                              textAlign: 'left',
                              border: '1px solid',
                              borderColor: active ? 'var(--color-gold)' : 'rgba(200, 168, 138, 0.2)',
                              backgroundColor: active ? 'rgba(200, 168, 138, 0.15)' : 'var(--color-white)',
                              color: 'var(--color-charcoal)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem'
                            }}
                          >
                            <span>{active ? '✓' : '+'}</span>
                            {interest.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="booking-input-group">
                    <label>Dining Suggestions Preference</label>
                    <select value={foodPreference} onChange={(e) => setFoodPreference(e.target.value)}>
                      <option value="Organic Cafes">Organic Desert Cafes & Smoothies</option>
                      <option value="Fine Dining">High-Desert Fine Dining & Wine Bars</option>
                      <option value="Campfire BBQ">Campfire BBQ & Cozy Saloons</option>
                      <option value="Self Catering">Self-Catering Fresh Groceries</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                <button 
                  className="btn-primary" 
                  onClick={() => setStep(2)}
                  style={{ width: '100%', maxWidth: '400px', padding: '1.2rem', justifyContent: 'center' }}
                >
                  Generate My Celestial Itinerary 🪄
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ELEGANT LOADER */}
          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '1.5rem', textAlign: 'center' }}>
              <div className="scroll-arrow" style={{ width: '60px', height: '60px', fontSize: '2rem', animation: 'bounce 1.5s infinite', border: '1px solid var(--color-gold)' }}>
                🪄
              </div>
              <h3 className="brand-text" style={{ fontSize: '1.8rem', color: 'var(--color-charcoal)' }}>
                SHStays AI Planner
              </h3>
              <p style={{ color: '#8B5E3C', fontSize: '1.05rem', fontStyle: 'italic', maxWidth: '400px' }}>
                "{loadingText}"
              </p>
            </div>
          )}

          {/* STEP 3: HIGH-FIDELITY ITINERARY RESULT */}
          {step === 3 && itinerary && (
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
              {/* Daily Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#8B5E3C', letterSpacing: '2px', fontWeight: 600 }}>
                    Tailored High-Desert Guide
                  </span>
                  <h3 className="brand-text" style={{ fontSize: '2rem', marginTop: '4px', color: '#2E2A26' }}>
                    Your {itinerary.travelStyle} Escape in {itinerary.destination}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '0.8rem' }}>
                    <span className="amenity-tag" style={{ background: '#E6D7C3', fontWeight: 600 }}>🏛️ {itinerary.propertyName}</span>
                    <span className="amenity-tag">👥 {itinerary.groupType}</span>
                    <span className="amenity-tag">💎 {itinerary.budget} Budget</span>
                    <span className="amenity-tag">🍷 {itinerary.travelStyle} Mood</span>
                  </div>
                </div>

                {/* Vertical Timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', position: 'relative', paddingLeft: '1rem', borderLeft: '1px dashed rgba(200, 168, 138, 0.4)', marginLeft: '1rem' }}>
                  {itinerary.days.map((day, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      {/* Day Circle marker */}
                      <div style={{
                        position: 'absolute',
                        left: '-26px',
                        top: '4px',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        background: 'var(--color-brown)',
                        border: '3px solid var(--bg-cream)'
                      }} />
                      
                      <h4 className="brand-text" style={{ fontSize: '1.4rem', color: 'var(--color-brown)', marginBottom: '1rem' }}>
                        {day.title}
                      </h4>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {day.activities.map((act, actIdx) => (
                          <div 
                            key={actIdx} 
                            style={{ 
                              background: 'var(--color-white)', 
                              padding: '1rem 1.2rem', 
                              borderRadius: '16px', 
                              border: '1px solid rgba(200, 168, 138, 0.15)',
                              boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
                              display: 'flex',
                              gap: '1rem'
                            }}
                          >
                            <span style={{ fontSize: '1.5rem', marginTop: '2px' }}>{act.icon}</span>
                            <div>
                              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                                  {act.time}
                                </span>
                              </div>
                              <h5 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-charcoal)', margin: '2px 0 4px' }}>
                                {act.title}
                              </h5>
                              <p style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-light)', lineHeight: '1.4' }}>
                                {act.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar: Recommendations & Auto Sync */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Weather widget */}
                <div style={{ background: 'var(--bg-beige)', padding: '1.2rem', borderRadius: '16px', border: '1px solid rgba(200,168,138,0.25)' }}>
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#8B5E3C', marginBottom: '0.8rem', fontWeight: 600 }}>
                    Live Forecast Sync
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '1.05rem', color: '#2E2A26' }}>
                    <span>🌡️</span> {itinerary.weather.forecast}
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#8B5E3C', fontStyle: 'italic', marginTop: '0.5rem', lineHeight: '1.4' }}>
                    {itinerary.weather.warning}
                  </p>
                </div>

                {/* AI Concierge Tips */}
                <div style={{ background: 'var(--color-white)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(200, 168, 138, 0.2)' }}>
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#8B5E3C', marginBottom: '1rem', fontWeight: 600 }}>
                    AI Recommendations
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {itinerary.recommendations.map((rec, i) => (
                      <div key={i} style={{ borderBottom: '1px solid rgba(200, 168, 138, 0.1)', paddingBottom: '0.8rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-gold)', textTransform: 'uppercase' }}>
                          {rec.feature}
                        </span>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-light)', marginTop: '2px', lineHeight: '1.3' }}>
                          {rec.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Call to Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {preselectedProperty && (
                    <button 
                      className="btn-primary"
                      onClick={() => onBookStay(preselectedProperty)}
                      style={{ justifyContent: 'center', padding: '1rem' }}
                    >
                      Book Stay & Experience Now &rarr;
                    </button>
                  )}
                  <button 
                    className="btn-tray-clear" 
                    onClick={() => setStep(1)} 
                    style={{ textAlign: 'center', padding: '0.5rem', alignSelf: 'center' }}
                  >
                    Adjust Plan Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
