import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { X } from 'lucide-react';

const EventModal = ({ selectedDate, selectedEvent, onClose, onAddEvent, onEditEvent, onDeleteEvent }) => {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedEvent) {
      setEventName(selectedEvent.name);
      setStartTime(selectedEvent.startTime);
      setEndTime(selectedEvent.endTime);
      setDescription(selectedEvent.description || '');
    } else {
      setEventName('');
      setStartTime('');
      setEndTime('');
      setDescription('');
    }
  }, [selectedEvent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventData = {
      id: selectedEvent ? selectedEvent.id : Date.now(),
      name: eventName,
      date: format(selectedDate, 'yyyy-MM-dd'),
      startTime,
      endTime,
      description,
    };

    if (selectedEvent) {
      onEditEvent(eventData);
    } else {
      onAddEvent(eventData);
    }
  };

  return (
    <div className="event-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}><X /></button>
        <h2>{selectedEvent ? 'Edit Event' : 'Add Event'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Event name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit">{selectedEvent ? 'Update' : 'Add'} Event</button>
        </form>
        {selectedEvent && (
          <button className="delete-button" onClick={() => onDeleteEvent(selectedEvent.id)}>Delete Event</button>
        )}
      </div>
    </div>
  );
};

export default EventModal;

