import mongoose from 'mongoose';

export const connectDB = async (mongoDbURI) => {
  const conn = await mongoose.connect(mongoDbURI);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export * from './models/Client.js'
export * from './models/Project.js'
