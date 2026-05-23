import React from 'react';

const CATEGORIES = [
  { id: 'all', name: 'View all', image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=120&q=80' },
  { id: 'Desert Homes', name: 'Desert Homes', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=120&q=80' },
  { id: 'Treehouses', name: 'Treehouses', image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=120&q=80' },
  { id: 'Cabins', name: 'Cabins', image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=120&q=80' },
  { id: 'Luxury Villas', name: 'Luxury Villas', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=120&q=80' },
  { id: 'Cottages', name: 'Cottages', image: 'https://images.unsplash.com/photo-1527030280862-64139fbe04ca?auto=format&fit=crop&w=120&q=80' },
  { id: 'Unique Stays', name: 'Unique Stays', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=120&q=80' }
];

export default function Categories({ selectedCategory, onSelectCategory }) {
  return (
    <section className="categories-section">
      <div className="categories-container">
        {CATEGORIES.map((cat) => (
          <div 
            key={cat.id} 
            className={`category-card ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            <div className="category-arch">
              <img src={cat.image} alt={cat.name} />
            </div>
            <span className="category-name">{cat.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
