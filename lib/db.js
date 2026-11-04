
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing from environment variables.");
}

const cached = globalThis.mongooseCache || {
  conn: null,
  promise: null,
};

globalThis.mongooseCache = cached;

export async function connectDB() {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    // Allow the application to retry if the first connection fails.
    cached.promise = null;
    cached.conn = null;

    console.error("MongoDB connection failed:", error);
    throw error;
  }
}
