import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import eventRoutes from "./routes/events.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: ["https://event-app-nine-nu.vercel.app"], // your Vercel site
  methods: ["GET", "POST", "DELETE"],
}));

// Routes
app.use("/api/events", eventRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
