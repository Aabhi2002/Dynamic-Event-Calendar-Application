import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarHeader = ({ currentDate, onPrevMonth, onNextMonth, filterKeyword, setFilterKeyword }) => {
  return (
    <div className="calendar-header">
      <div className="month-navigation">
        <button onClick={onPrevMonth}><ChevronLeft /></button>
        <h2>{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={onNextMonth}><ChevronRight /></button>
      </div>
      <div className="filter">
        <input
          type="text"
          placeholder="Filter events..."
          value={filterKeyword}
          onChange={(e) => setFilterKeyword(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CalendarHeader;

