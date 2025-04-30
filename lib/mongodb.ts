import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;  

if (!MONGO_URI) {
  throw new Error('Please add your Mongo URI to the .env file');
}

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error: ', error);
    throw error;
  }
};