import React from 'react';

const EventList = ({ events }) => {
  return (
    <div className="event-list">
      <h3>Events for Selected Day</h3>
      {events.length === 0 ? (
        <p>No events for this day.</p>
      ) : (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <strong>{event.name}</strong>
              <br />
              {event.startTime} - {event.endTime}
              <br />
              {event.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;

