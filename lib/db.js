import mongoose from "mongoose";
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Please add MONGODB_URI to your .env file");
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };
export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) cached.promise = mongoose.connect(uri).then(m => m);
  cached.conn = await cached.promise;
  return cached.conn;
}
