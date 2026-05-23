import express from 'express';
import Property from '../models/Property.js';
import { mockProperties, mockBookings, mockWishlist } from '../data/mockDb.js';

const router = express.Router();

// Helper to check if MongoDB is active
const isMongoConnected = () => {
  return typeof process.env.MONGODB_CONNECTED !== 'undefined' 
    ? process.env.MONGODB_CONNECTED === 'true'
    : false;
};

// GET all properties (with filtering)
router.get('/properties', async (req, res) => {
  try {
    const { category, search, guests } = req.query;
    
    let properties = [];
    
    if (isMongoConnected()) {
      let query = {};
      
      if (category && category !== 'All' && category !== 'View all') {
        query.type = category;
      }
      
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { location: { $regex: search, $options: 'i' } },
          { bestFor: { $regex: search, $options: 'i' } }
        ];
      }
      
      if (guests) {
        const guestNum = parseInt(guests, 10);
        if (!isNaN(guestNum)) {
          query.guests = { $gte: guestNum };
        }
      }
      
      properties = await Property.find(query);
    } else {
      // Mock Fallback
      properties = [...mockProperties];
      
      if (category && category !== 'All' && category !== 'View all') {
        properties = properties.filter(p => p.type.toLowerCase() === category.toLowerCase());
      }
      
      if (search) {
        const searchLower = search.toLowerCase();
        properties = properties.filter(p => 
          p.name.toLowerCase().includes(searchLower) ||
          p.location.toLowerCase().includes(searchLower) ||
          (p.bestFor && p.bestFor.toLowerCase().includes(searchLower))
        );
      }
      
      if (guests) {
        const guestNum = parseInt(guests, 10);
        if (!isNaN(guestNum)) {
          properties = properties.filter(p => p.guests >= guestNum);
        }
      }
    }
    
    res.json(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

// GET single property
router.get('/properties/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (isMongoConnected()) {
      const property = await Property.findById(id);
      if (!property) return res.status(404).json({ error: 'Property not found' });
      return res.json(property);
    } else {
      const property = mockProperties.find(p => p._id === id);
      if (!property) return res.status(404).json({ error: 'Property not found' });
      return res.json(property);
    }
  } catch (error) {
    console.error(`Error fetching property ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

// GET wishlist
router.get('/wishlist', (req, res) => {
  // Simple session/in-memory wishlist for demonstration
  res.json(mockWishlist);
});

// POST toggle wishlist
router.post('/wishlist/toggle', async (req, res) => {
  const { propertyId } = req.body;
  if (!propertyId) return res.status(400).json({ error: 'propertyId is required' });
  
  try {
    const index = mockWishlist.indexOf(propertyId);
    let action = '';
    
    if (index === -1) {
      mockWishlist.push(propertyId);
      action = 'added';
    } else {
      mockWishlist.splice(index, 1);
      action = 'removed';
    }
    
    res.json({ success: true, action, wishlist: mockWishlist });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle wishlist' });
  }
});

// POST booking
router.post('/bookings', async (req, res) => {
  const { propertyId, guestName, checkIn, checkOut, guests, totalAmount } = req.body;
  
  if (!propertyId || !checkIn || !checkOut || !guests) {
    return res.status(400).json({ error: 'Missing required booking parameters' });
  }
  
  try {
    const booking = {
      _id: 'bk_' + Math.random().toString(36).substr(2, 9),
      propertyId,
      guestName: guestName || 'Serene Traveler',
      checkIn,
      checkOut,
      guests,
      totalAmount: totalAmount || 0,
      createdAt: new Date()
    };
    
    mockBookings.push(booking);
    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// GET bookings list
router.get('/bookings', (req, res) => {
  res.json(mockBookings);
});

export default router;
