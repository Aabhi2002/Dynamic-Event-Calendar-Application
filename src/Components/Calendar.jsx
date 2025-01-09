import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import EventList from './EventList';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterKeyword, setFilterKeyword] = useState('');

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    setShowModal(false);
  };

  const handleEditEvent = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setShowModal(false);
    setSelectedEvent(null);
  };

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(filterKeyword.toLowerCase()) ||
    (event.description && event.description.toLowerCase().includes(filterKeyword.toLowerCase()))
  );

  return (
    <div className="calendar">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        filterKeyword={filterKeyword}
        setFilterKeyword={setFilterKeyword}
      />
      <CalendarGrid
        currentDate={currentDate}
        events={filteredEvents}
        onDateClick={handleDateClick}
        onEventClick={(event) => {
          setSelectedEvent(event);
          setShowModal(true);
        }}
      />
      {showModal && (
        <EventModal
          selectedDate={selectedDate}
          selectedEvent={selectedEvent}
          onClose={() => {
            setShowModal(false);
            setSelectedEvent(null);
          }}
          onAddEvent={handleAddEvent}
          onEditEvent={handleEditEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
      <EventList
        events={filteredEvents.filter(event => 
          selectedDate && format(new Date(event.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
        )}
      />
    </div>
  );
};

export default Calendar;

