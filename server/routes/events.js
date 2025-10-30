import express from "express";
import Event from "../models/Event.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

// ✅ Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Create new event
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("time").notEmpty().withMessage("Time is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const event = new Event(req.body);
      const saved = await event.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error("❌ Error saving event:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// ✅ Delete event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
