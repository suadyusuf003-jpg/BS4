import mongoose from "mongoose";

// Load MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/swahilipot";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit process if DB fails
  }
};