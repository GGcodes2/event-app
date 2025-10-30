export default function EventList({ events }) {
    return (
      <div>
        <h2>📅 Upcoming Events</h2>
        {events.length === 0 ? (
          <p>No events yet.</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li key={event._id}>
                <strong>{event.name}</strong> — {event.description} <br />
                📍 {event.location} | 🗓 {new Date(event.date).toDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  