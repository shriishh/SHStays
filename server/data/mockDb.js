// Beautifully seeded mock database for fallback
export const mockProperties = [
  {
    _id: "prop_1",
    name: "Luna Desert Villa",
    type: "Desert Homes",
    price: 14500,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80"
    ],
    location: "Joshua Tree, CA",
    rating: 4.9,
    reviewsCount: 128,
    guests: 4,
    bedrooms: 3,
    bathrooms: 3,
    amenities: ["Pool", "Hot Tub", "Fire Pit", "WiFi", "AC", "Kitchen"],
    distanceToPark: "4.2 km",
    cancellation: "Moderate",
    hostRating: 4.9,
    bestFor: "🏆 Stargazing & Luxury",
    description: "A premium luxury desert sanctuary featuring an infinity pool overlooking natural boulder formations and expansive night skies.",
    featured: true
  },
  {
    _id: "prop_2",
    name: "Sunset Rock Retreat",
    type: "Luxury Villas",
    price: 11200,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80"
    ],
    location: "Yucca Valley, CA",
    rating: 4.8,
    reviewsCount: 96,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["Hot Tub", "Fire Pit", "Outdoor Shower", "WiFi", "AC", "Kitchen"],
    distanceToPark: "7.8 km",
    cancellation: "Flexible",
    hostRating: 4.8,
    bestFor: "💰 Best Price & Sunset Views",
    description: "Nestled high on the hills, this stunning modern villa blends directly into the ancient granite boulders of Yucca Valley.",
    featured: true
  },
  {
    _id: "prop_3",
    name: "Sagebrush Cabin",
    type: "Cabins",
    price: 9800,
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80"
    ],
    location: "Pioneertown, CA",
    rating: 4.9,
    reviewsCount: 74,
    guests: 3,
    bedrooms: 2,
    bathrooms: 1,
    amenities: ["Fire Pit", "Wood Stove", "WiFi", "Kitchen", "Record Player"],
    distanceToPark: "9.1 km",
    cancellation: "Strict",
    hostRating: 4.9,
    bestFor: "⭐ Authentic & Local Vibe",
    description: "An authentic rustic wooden cabin with premium modern touches, located just steps away from the historic Pioneertown stables.",
    featured: true
  },
  {
    _id: "prop_4",
    name: "Canyon View Treehouse",
    type: "Treehouses",
    price: 16000,
    image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80"
    ],
    location: "Yucca Valley, CA",
    rating: 4.95,
    reviewsCount: 43,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1.5,
    amenities: ["Pool", "Hot Tub", "Outdoor Deck", "WiFi", "AC", "Espresso Machine"],
    distanceToPark: "8.5 km",
    cancellation: "Moderate",
    hostRating: 5.0,
    bestFor: "👑 Elevated Romantic Escape",
    description: "Suspended inside a lush hidden canyon oasis, this architect-designed treehouse provides sweeping 360-degree desert canyon vistas.",
    featured: true
  },
  {
    _id: "prop_5",
    name: "Wildflower Desert Cottage",
    type: "Cottages",
    price: 8500,
    image: "https://images.unsplash.com/photo-1527030280862-64139fbe04ca?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1527030280862-64139fbe04ca?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80"
    ],
    location: "Joshua Tree, CA",
    rating: 4.75,
    reviewsCount: 38,
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Fire Pit", "WiFi", "Kitchen", "Hammock", "AC"],
    distanceToPark: "5.1 km",
    cancellation: "Flexible",
    hostRating: 4.7,
    bestFor: "🌱 Solitude & Cozy Comfort",
    description: "A serene desert cottage surrounded by wild brush and blooming Joshua Tree desert flora. Perfect for writers and solo travelers.",
    featured: false
  },
  {
    _id: "prop_6",
    name: "Celestial Dome Retreat",
    type: "Unique Stays",
    price: 18500,
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80"
    ],
    location: "Joshua Tree, CA",
    rating: 4.92,
    reviewsCount: 88,
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["Pool", "Hot Tub", "Fire Pit", "Stargazing Deck", "WiFi", "AC"],
    distanceToPark: "2.8 km",
    cancellation: "Strict",
    hostRating: 4.9,
    bestFor: "🌌 Premium Group Stargazing",
    description: "An iconic geothermal dome retreat offering luxury indoor comfort under a massive transparent ceiling designed for stargazing.",
    featured: true
  }
];

export const mockBookings = [];
export const mockWishlist = [];
