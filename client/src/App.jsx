import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import { Delete, Add, Search } from "@mui/icons-material";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api/events";


export default function App() {
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    location: "",
    time: "",
  });

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const res = await axios.get(API_URL);
      setEvents(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Search filter
  useEffect(() => {
    const lower = search.toLowerCase();
    setFiltered(
      events.filter(
        (e) =>
          e.name.toLowerCase().includes(lower) ||
          e.location.toLowerCase().includes(lower)
      )
    );
  }, [search, events]);

  // Add new event
  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!newEvent.name || !newEvent.description || !newEvent.location || !newEvent.time) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post(API_URL, newEvent);
      setNewEvent({ name: "", description: "", location: "", time: "" });
      fetchEvents();
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Delete event
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setEvents(events.filter((e) => e._id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
  variant="h3"
  align="center"
  sx={{
    background: "linear-gradient(90deg, #ff4081, #00e5ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontWeight: "bold",
    mb: 4,
    textShadow: "0 0 15px rgba(255,64,129,0.5)",
  }}
>
  🎉 Event Finder – Party Mode
</Typography>

      {/* Add Event Form */}
      <Box
        component="form"
        onSubmit={handleAddEvent}
        sx={{
          backgroundColor: "#fff",
          boxShadow: 3,
          borderRadius: 3,
          p: 4,
          mb: 5,
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Add New Event
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Event Name"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Time"
              InputLabelProps={{ shrink: true }}
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
          </Grid>
        </Grid>
        <Button
  variant="contained"
  color="primary"
  startIcon={<Add />}
  type="submit"
  fullWidth
  sx={{
    mt: 3,
    py: 1.5,
    fontSize: "1rem",
    boxShadow: "0 0 10px #ff4081",
  }}
>
          Add Event
        </Button>
      </Box>

      {/* Search Bar */}
      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Search color="action" />
        <TextField
          fullWidth
          placeholder="Search by name or location..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Event List */}
      <Grid container spacing={3}>
        {filtered.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ width: "100%" }}>
            No events found 😢
          </Typography>
        ) : (
          filtered.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event._id}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 5 },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {event.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    📍 {event.location}
                  </Typography>
                  <Typography color="text.secondary">
                    🕓 {new Date(event.time).toLocaleString()}
                  </Typography>
                  <Typography mt={1.5}>{event.description}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton color="error" onClick={() => handleDelete(event._id)}>
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
