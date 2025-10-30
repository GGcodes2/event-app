import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  time: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Event", eventSchema);
