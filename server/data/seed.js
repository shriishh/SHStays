import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Property from '../models/Property.js';
import { mockProperties } from './mockDb.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/luna-vista';

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    // Delete existing properties
    await Property.deleteMany({});
    console.log('Cleared existing properties from database.');

    // Remove _id from mock properties so Mongo can generate new ObjectIds, or keep them
    const propertiesToInsert = mockProperties.map(p => {
      const { _id, ...propWithoutId } = p;
      return propWithoutId;
    });

    // Insert seeded properties
    await Property.insertMany(propertiesToInsert);
    console.log('Successfully seeded database with properties!');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
