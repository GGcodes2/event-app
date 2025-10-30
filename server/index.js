import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import eventRoutes from "./routes/events.js";

dotenv.config();
const app = express();

// ✅ Allowed Origins (local + deployed frontend)
const allowedOrigins = [
  "http://localhost:5173",
  "https://event-app-zeta-two.vercel.app"
];

// ✅ Middleware
app.use(express.json());

// ✅ Proper CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is running fine 🚀");
});

// ✅ Event routes
app.use("/api/events", eventRoutes);

// ✅ Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
