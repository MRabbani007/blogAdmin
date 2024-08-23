import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env?.MONGODB_URI;
    if (!uri) return null;
    return mongoose.connect(uri);
  }
}
