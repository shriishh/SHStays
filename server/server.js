import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';
import aiRouter from './routes/ai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/luna-vista';

// Middleware
app.use(cors({ origin: '*' })); // Allow React app to fetch
app.use(express.json());

// Routes
app.use('/api', apiRouter);
app.use('/api', aiRouter);

// Base route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to the SHStays API!', 
    database: process.env.MONGODB_CONNECTED === 'true' ? 'MongoDB Active' : 'Fallback Mock DB Active (Local Resilience Mode)' 
  });
});

// Database connection with fallback resilience
async function startServer() {
  try {
    console.log('Connecting to MongoDB...');
    mongoose.set('strictQuery', false);
    
    // Timeout connection attempt quickly so server starts without hanging
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 3000
    });
    
    process.env.MONGODB_CONNECTED = 'true';
    console.log('🌿 Connected to MongoDB successfully.');
  } catch (err) {
    process.env.MONGODB_CONNECTED = 'false';
    console.log('\n======================================================');
    console.log('⚠️  DATABASE NOTICE: MongoDB could not be reached.');
    console.log('💡 SHStays is automatically running in standard RESILIENCE MODE.');
    console.log('✨ Servicing requests using high-fidelity pre-seeded data.');
    console.log('======================================================\n');
  }

  app.listen(PORT, () => {
    console.log(`✨ SHStays Server running on port ${PORT}`);
  });
}

startServer();
