import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  images: [{ type: String }],
  location: { type: String, required: true },
  rating: { type: Number, required: true, default: 4.5 },
  reviewsCount: { type: Number, default: 0 },
  guests: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  amenities: [{ type: String }],
  distanceToPark: { type: String, required: true }, // e.g. "4.2 km"
  cancellation: { type: String, required: true }, // e.g. "Moderate", "Flexible", "Strict"
  hostRating: { type: Number, required: true, default: 4.5 },
  bestFor: { type: String }, // e.g. "Stargazing & Luxury", "Couples Retreat", etc.
  description: { type: String },
  featured: { type: Boolean, default: false }
}, {
  timestamps: true
});

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);
export default Property;
