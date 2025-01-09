import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay } from 'date-fns';

const CalendarGrid = ({ currentDate, events, onDateClick, onEventClick }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dateFormat = "d";
  const rows = [];

  let days = [];
  let day = startDate;

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      const cloneDay = day;
      const formattedDate = format(cloneDay, 'yyyy-MM-dd');
      const dayEvents = events.filter(event => format(new Date(event.date), 'yyyy-MM-dd') === formattedDate);

      days.push(
        <div
          className={`calendar-day ${!isSameMonth(day, monthStart) ? 'disabled' : ''} ${isSameDay(day, new Date()) ? 'today' : ''}`}
          key={day}
          onClick={() => onDateClick(cloneDay)}
        >
          <span className="day-number">{format(day, dateFormat)}</span>
          {dayEvents.map(event => (
            <div
              key={event.id}
              className="event-indicator"
              onClick={(e) => {
                e.stopPropagation();
                onEventClick(event);
              }}
            >
              {event.name}
            </div>
          ))}
        </div>
      );
      day = new Date(day.getTime() + 24 * 60 * 60 * 1000);
    }
    rows.push(
      <div className="calendar-row" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="calendar-grid">
      <div className="calendar-row day-names">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(dayName => (
          <div className="day-name" key={dayName}>{dayName}</div>
        ))}
      </div>
      {rows}
    </div>
  );
};

export default CalendarGrid;

