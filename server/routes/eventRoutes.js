import express from "express";
const router = express.Router();

let events = []; // temporary in-memory storage

// ✅ GET all events
router.get("/", (req, res) => {
  res.json(events);
});

// ✅ POST a new event
router.post("/", (req, res) => {
  const { name, date } = req.body;

  if (!name || !date) {
    return res.status(400).json({ message: "Name and date are required" });
  }

  const newEvent = {
    id: events.length + 1,
    name,
    date,
  };

  events.push(newEvent);
  res.status(201).json(newEvent);
});

export default router;
