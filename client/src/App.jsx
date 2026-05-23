import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import Categories from './components/Categories';
import PropertyCard from './components/PropertyCard';
import CompareTray from './components/CompareTray';
import CompareModal from './components/CompareModal';
import BookingModal from './components/BookingModal';
import About from './components/About';
import Footer from './components/Footer';
import Toast from './components/Toast';
import AIPlanner from './components/AIPlanner';

const API_BASE = 'http://localhost:5000/api';

export default function App() {
  const [properties, setProperties] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [comparedItems, setComparedItems] = useState([]);
  
  // Filtering States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchParams, setSearchParams] = useState({ search: '', guests: '' });
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Modals / Overlays
  const [compareOpen, setCompareOpen] = useState(false);
  const [bookingProperty, setBookingProperty] = useState(null);
  const [aiPlannerOpen, setAiPlannerOpen] = useState(false);
  const [aiProperty, setAiProperty] = useState(null);

  const handleOpenAIPlanner = (property = null) => {
    setAiProperty(property);
    setAiPlannerOpen(true);
  };

  // Toast Alerts
  const [toasts, setToasts] = useState([]);

  // Toast Trigger
  const triggerToast = useCallback((message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter(t => t.id !== id));
  };

  // Fetch properties from Express backend
  const fetchProperties = useCallback(async () => {
    try {
      let url = `${API_BASE}/properties?`;
      if (selectedCategory && selectedCategory !== 'all') {
        url += `category=${encodeURIComponent(selectedCategory)}&`;
      }
      if (searchParams.search) {
        url += `search=${encodeURIComponent(searchParams.search)}&`;
      }
      if (searchParams.guests) {
        url += `guests=${encodeURIComponent(searchParams.guests)}&`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      setProperties(data);
    } catch (error) {
      console.error('Failed to load properties. Using local mock fallback directly.', error);
      // Hard fallback in case backend server is booting
      import('./data/mockDb.js').then(module => {
        let items = [...module.mockProperties];
        if (selectedCategory && selectedCategory !== 'all') {
          items = items.filter(p => p.type === selectedCategory);
        }
        if (searchParams.search) {
          const s = searchParams.search.toLowerCase();
          items = items.filter(p => p.name.toLowerCase().includes(s) || p.location.toLowerCase().includes(s));
        }
        setProperties(items);
      });
    }
  }, [selectedCategory, searchParams]);

  // Load initial wishlist
  const fetchWishlist = async () => {
    try {
      const res = await fetch(`${API_BASE}/wishlist`);
      if (res.ok) {
        const data = await res.json();
        setWishlist(data);
      }
    } catch (err) {
      console.log('Failed fetching wishlist, running offline state.');
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  // Handle Toggle Wishlist
  const handleToggleWishlist = async (propertyId) => {
    try {
      const res = await fetch(`${API_BASE}/wishlist/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId })
      });
      const data = await res.json();
      if (data.success) {
        setWishlist(data.wishlist);
        if (data.action === 'added') {
          triggerToast('❤️ Added stay to your wishlist');
        } else {
          triggerToast('💔 Removed stay from your wishlist');
        }
      }
    } catch (err) {
      // Offline fallback
      setWishlist((prev) => {
        const index = prev.indexOf(propertyId);
        if (index === -1) {
          triggerToast('❤️ Added stay to your wishlist');
          return [...prev, propertyId];
        } else {
          triggerToast('💔 Removed stay from your wishlist');
          return prev.filter(id => id !== propertyId);
        }
      });
    }
  };

  // Handle Toggle Compare (⇄)
  const handleToggleCompare = (property) => {
    const exists = comparedItems.some(item => item._id === property._id);
    
    if (exists) {
      setComparedItems(prev => prev.filter(item => item._id !== property._id));
      triggerToast('⇄ Removed listing from comparison');
    } else {
      if (comparedItems.length >= 5) {
        triggerToast('⚠️ Comparison tray limit is 5 properties');
        return;
      }
      setComparedItems(prev => [...prev, property]);
      triggerToast(`⇄ Added ${property.name} to compare`);
    }
  };

  const handleRemoveCompare = (id) => {
    setComparedItems(prev => prev.filter(item => item._id !== id));
    triggerToast('⇄ Removed listing from comparison');
  };

  const handleClearCompare = () => {
    setComparedItems([]);
    triggerToast('🧹 Comparison tray cleared');
  };

  // Search parameters handling
  const handleSearch = (params) => {
    setSearchParams(params);
    triggerToast('🔍 Filters applied successfully');
  };

  // Newsletter subscribe
  const handleSubscribe = (email) => {
    triggerToast(`🌿 Thank you for subscribing, traveler!`);
  };

  // Booking confirm action
  const handleConfirmBooking = async (bookingData) => {
    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      const data = await res.json();
      if (data.success) {
        triggerToast(`🎉 Booking confirmed! Reserved for ${bookingData.guestName}.`);
        setBookingProperty(null);
      }
    } catch (err) {
      // Offline booking confirmation
      triggerToast(`🎉 Offline Reservation success! Dates: ${bookingData.checkIn}.`);
      setBookingProperty(null);
    }
  };

  // Filtering stays list based on states
  const displayedProperties = properties.filter(prop => {
    if (showWishlistOnly) {
      return wishlist.includes(prop._id);
    }
    return true;
  });

  return (
    <div className="app-container">
      {/* Toast Alert Drawer */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            message={toast.message} 
            onClose={() => removeToast(toast.id)} 
          />
        ))}
      </div>

      <Navbar 
        wishlistCount={wishlist.length} 
        compareCount={comparedItems.length}
        showWishlistOnly={showWishlistOnly}
        onShowWishlistOnly={setShowWishlistOnly}
        onOpenCompare={() => setCompareOpen(true)}
        onOpenAIPlanner={() => handleOpenAIPlanner()}
      />

      <Hero onOpenAIPlanner={() => handleOpenAIPlanner()} />
      <SearchBar onSearch={handleSearch} />
      <Categories 
        selectedCategory={selectedCategory} 
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setShowWishlistOnly(false); // Reset wishlist filter when picking categories
        }} 
      />

      {/* Main Browse Section */}
      <section id="stays" className="listings-section" style={{ minHeight: '400px' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">
              {showWishlistOnly ? 'Your Saved Whishlist' : 'Handpicked stays for you'}
            </h2>
            <p style={{ color: '#8B5E3C', fontSize: '0.9rem', marginTop: '4px', letterSpacing: '0.5px' }}>
              {displayedProperties.length} stunning {displayedProperties.length === 1 ? 'retreat' : 'retreats'} found
            </p>
          </div>
          {showWishlistOnly && (
            <button 
              className="view-all-link"
              onClick={() => setShowWishlistOnly(false)}
            >
              Back to all stays
            </button>
          )}
        </div>

        {displayedProperties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: 'var(--bg-beige)', borderRadius: '24px' }}>
            <span style={{ fontSize: '2.5rem' }}>🏜️</span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginTop: '1rem', color: '#2E2A26' }}>
              No celestial retreats match your filters
            </h3>
            <p style={{ color: '#4A443E', marginTop: '0.5rem' }}>
              Try broadening your search criteria or clear your favorite stays filter.
            </p>
          </div>
        ) : (
          <div className="listings-grid">
            {displayedProperties.map(property => (
              <PropertyCard 
                key={property._id}
                property={property}
                isWishlisted={wishlist.includes(property._id)}
                isCompared={comparedItems.some(item => item._id === property._id)}
                onToggleWishlist={handleToggleWishlist}
                onToggleCompare={handleToggleCompare}
              />
            ))}
          </div>
        )}
      </section>

      <About />
      
      <Footer onSubscribe={handleSubscribe} />

      {/* Floating Compare Drawer */}
      <CompareTray 
        comparedItems={comparedItems}
        onRemove={handleRemoveCompare}
        onClear={handleClearCompare}
        onOpenCompare={() => setCompareOpen(true)}
      />

      {/* Compare Modal */}
      {compareOpen && (
        <CompareModal 
          comparedItems={comparedItems}
          onClose={() => setCompareOpen(false)}
          onRemove={handleRemoveCompare}
          onBook={(prop) => {
            setCompareOpen(false);
            setBookingProperty(prop);
          }}
          onOpenAIPlannerWithProp={(prop) => {
            setCompareOpen(false);
            handleOpenAIPlanner(prop);
          }}
        />
      )}

      {/* Booking Calendar Modal */}
      {bookingProperty && (
        <BookingModal 
          property={bookingProperty}
          onClose={() => setBookingProperty(null)}
          onConfirm={handleConfirmBooking}
          onOpenAIPlanner={(prop) => handleOpenAIPlanner(prop)}
        />
      )}

      {/* AI Itinerary Planner Modal */}
      <AIPlanner 
        isOpen={aiPlannerOpen}
        onClose={() => setAiPlannerOpen(false)}
        preselectedProperty={aiProperty}
        onBookStay={(prop) => {
          setAiPlannerOpen(false);
          setBookingProperty(prop);
        }}
      />
    </div>
  );
}
