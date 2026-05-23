import express from 'express';
import Property from '../models/Property.js';
import { mockProperties } from '../data/mockDb.js';

const router = express.Router();

// Helper to check if MongoDB is active
const isMongoConnected = () => {
  return typeof process.env.MONGODB_CONNECTED !== 'undefined' 
    ? process.env.MONGODB_CONNECTED === 'true'
    : false;
};

// POST /api/ai-itinerary
router.post('/ai-itinerary', async (req, res) => {
  const { 
    destination = 'Joshua Tree', 
    duration = 3, 
    budget = 'Luxury', 
    travelStyle = 'Romantic', 
    groupType = 'Couple Retreat', 
    interests = ['Stargazing', 'Hiking'], 
    foodPreference = 'Organic Cafes',
    propertyId 
  } = req.body;

  try {
    let selectedProperty = null;

    if (propertyId) {
      if (isMongoConnected()) {
        selectedProperty = await Property.findById(propertyId);
      } else {
        selectedProperty = mockProperties.find(p => p._id === propertyId);
      }
    }

    const propName = selectedProperty ? selectedProperty.name : 'SHStays Retreat';
    const propType = selectedProperty ? selectedProperty.type : 'Boutique Stay';

    // Establish Weather Forecast & Warnings
    let weatherStatus = '28°C • Warm & Clear Skies';
    let weatherWarning = '☀️ Excellent stargazing forecast tonight. Plan hikes early to avoid peak noon heat.';
    
    if (interests.includes('Stargazing')) {
      weatherStatus = '26°C • Crystal Clear Desert Night';
      weatherWarning = '🌌 Zero cloud cover expected! Perfect visibility for Milky Way viewing from your stay.';
    } else if (travelStyle === 'Adventure') {
      weatherStatus = '31°C • Sunny Desert Heat';
      weatherWarning = '⚠️ High noon heat advisory. Hikes are scheduled for sunrise/sunset hours with hydration alerts.';
    }

    // Generate Dynamic Days Activities based on preferences
    const days = [];
    const parsedDuration = Math.min(Math.max(parseInt(duration, 10) || 3, 1), 6);

    const activityPools = {
      morning: [
        { time: '06:30 AM', title: 'Chasing the Desert Sun', description: 'Early morning hike along Barker Dam Trail. Watch the golden rays catch the ancient Joshua trees.', icon: '🥾' },
        { time: '08:30 AM', title: 'Wellness Boulder Yoga', description: 'Sunrise stretch session on the property\'s private granite boulder deck.', icon: '🧘' },
        { time: '09:00 AM', title: 'Cozy Town Brunch', description: 'Artisan espresso and avocado toasts at the local Frontier Café.', icon: '☕' }
      ],
      afternoon: [
        { time: '01:00 PM', title: 'Pioneertown Stride', description: 'Explore the 1940s living movie set of Pioneertown and browse local leather artisans.', icon: '🤠' },
        { time: '02:30 PM', title: 'Retreat Relaxation', description: `Return to ${propName} for private pool dipping and reading under the shade arches.`, icon: '🏊' },
        { time: '04:00 PM', title: 'Canyon Sound Bath', description: 'Attend a transcendental resonant sound healing session at the famous local Integratron dome.', icon: '🔔' }
      ],
      evening: [
        { time: '06:30 PM', title: 'Sunset Silhouette Bonfire', description: 'Gather round the private fire pit for red wines, slow acoustic vinyls, and visual stories.', icon: '🔥' },
        { time: '07:30 PM', title: 'High-Desert Dining', description: 'Indulge in organic, wood-fired seasonal dishes at Pappy & Harriet\'s or La Copine.', icon: '🍽️' },
        { time: '09:30 PM', title: 'Milky Way Stargazing canopy', description: `Turn off all outdoor lights at ${propName} and look up. Spot constellations and shooting stars.`, icon: '🌌' }
      ]
    };

    // Personalize Activities based on Mood & Stay Type
    if (travelStyle === 'Relax' || travelStyle === 'Wellness') {
      activityPools.morning[0] = { time: '08:30 AM', title: 'Organic Breakfast Basket', description: 'Delivered directly to your patio. Locally sourced desert honey and fresh pastries.', icon: '🧺' };
      activityPools.afternoon[2] = { time: '03:00 PM', title: 'High-Desert Aromatherapy Massage', description: 'Private in-room wellness treatment overlooking the boulder valleys.', icon: '💆' };
    }
    
    if (travelStyle === 'Adventure') {
      activityPools.morning[1] = { time: '06:00 AM', title: 'Ryan Mountain Summit Challenge', description: 'Ascend 1,000 feet for sweeping panoramic vistas over the entire Joshua Tree National Park.', icon: '⛰️' };
      activityPools.afternoon[0] = { time: '01:30 PM', title: 'Hidden Canyon Photography Safari', description: 'Guided off-road Jeep tour deep into private rock arches and sand trails.', icon: '📷' };
    }

    if (travelStyle === 'Romantic') {
      activityPools.evening[0] = { time: '06:00 PM', title: 'Private Chef Sunset Dining', description: `A custom-cooked 3-course candlelit dinner on the patio of your ${propType}.`, icon: '🍷' };
    }

    // Build the dynamic itinerary days
    for (let i = 1; i <= parsedDuration; i++) {
      let dayTitle = `Day ${i}: `;
      const activities = [];

      if (i === 1) {
        dayTitle += 'Arrival & Celestial Accents';
        activities.push({ time: '03:00 PM', title: `Check-in at ${propName}`, description: `Welcome to your desert sanctuary. Unpack, enjoy local welcome elderberry sodas, and sync with the desert silence.`, icon: '🔑' });
        activities.push(activityPools.evening[0]);
        activities.push(activityPools.evening[2]);
      } else if (i === parsedDuration) {
        dayTitle += 'Morning Quietude & Farewell';
        activities.push(activityPools.morning[1]);
        activities.push({ time: '11:00 AM', title: 'Farewell Stride', description: `Pack bags, capture final polaroid snaps, and complete checkout from ${propName}. Till next time, traveler!`, icon: '👋' });
      } else {
        // Core Days
        if (i === 2) {
          dayTitle += 'Trails, Tastes & Textures';
          activities.push(activityPools.morning[0]);
          activities.push(activityPools.afternoon[0]);
          activities.push(activityPools.evening[1]);
        } else if (i === 3) {
          dayTitle += 'Sound Healing & Desert Spells';
          activities.push(activityPools.morning[2]);
          activities.push(activityPools.afternoon[2]);
          activities.push(activityPools.evening[0]);
        } else {
          dayTitle += 'Local Spontaneity';
          activities.push(activityPools.morning[0]);
          activities.push(activityPools.afternoon[1]);
          activities.push(activityPools.evening[2]);
        }
      }

      days.push({
        dayNumber: i,
        title: dayTitle,
        activities
      });
    }

    // Synthesizing Smart AI Tips
    const suggestions = [
      { feature: 'Best Trail Timing', detail: 'Hike Barker Dam at 6:45 AM to avoid crowds and photograph desert tortoises in optimal soft lighting.' },
      { feature: 'Crowd Avoidance', detail: 'Visit the Pioneertown main street on weekdays. Weekends draw heavy traffic around noon.' },
      { feature: 'Local Cafe Spot', detail: 'Frontier Cafe is excellent, but lines get long. Call ahead or visit before 8:30 AM.' },
      { feature: 'Weather Smart Backup', detail: 'If high winds occur, substitute high-ridge hikes with the Integratron Sound Bath or indoor pottery sessions.' },
      { feature: 'Mood Enhancer', detail: travelStyle === 'Romantic' ? 'Set up the outdoor firepit at sunset with local sage bundles for a beautiful grounding fragrance.' : 'Wake up at 5:15 AM for stargazing right before dawn - the Milky Way aligns beautifully.' }
    ];

    res.json({
      destination,
      duration: parsedDuration,
      budget,
      travelStyle,
      groupType,
      propertyName: propName,
      propertyType: propType,
      weather: {
        forecast: weatherStatus,
        warning: weatherWarning
      },
      days,
      recommendations: suggestions
    });

  } catch (error) {
    console.error('Error generating AI itinerary:', error);
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
});

export default router;
