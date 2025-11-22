// food-api/src/config/db.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectDB = async () => {
  // Get the MONGO_URI from the environment variables
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('FATAL ERROR: MONGO_URI is not defined in the environment variables. Check your .env file.');
    // Exit the process if the essential connection string is missing
    process.exit(1); 
  }

  try {
    // Attempt to connect to MongoDB
    // Mongoose handles the connection pooling and driver logic internally
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    // Exit on connection failure
    process.exit(1); 
  }
};

export default connectDB;