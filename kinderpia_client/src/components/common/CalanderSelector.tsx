import React, { useState } from 'react';
import Calendar from 'react-calendar';
import type { Value } from 'react-calendar/dist/cjs/shared/types';
import 'react-calendar/dist/Calendar.css';
import '../../styles/meeting/createpage/CalanderSelector.scss';
import CheckMarker from '../common/CheckMarker';

interface CalanderSelectorProps {
  date: string;
  time: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
}

const CalanderSelector: React.FC<CalanderSelectorProps> = ({ 
  date, 
  time, 
  onDateChange, 
  onTimeChange 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    date ? new Date(date) : new Date()
  );

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      const formattedDate = value.toISOString().split('T')[0];
      onDateChange(formattedDate);
    }
  };

  return (
    <div className="calander-selector-container">
      <div className='calander-selector-header'>
        <label className="calander-selector-header-title">모임 일시<span> *</span></label>
        <CheckMarker
          value={ time }
        />
      </div>
      <hr/>
      <div className="calander-selector-day-picker">
      <Calendar
          onChange={handleDateChange}
          value={selectedDate}
          locale="ko-KR"
          formatDay={(locale, date) => date.getDate().toString()}
          minDate={new Date()}
          calendarType='gregory'
          next2Label={null}
          prev2Label={null}
          className="custom-calendar"
        />
      </div>

      <div className="calander-selector-time-picker">
        <input 
          type="time"
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="time-input"
        />
      </div>
    </div>
  );
};

export default CalanderSelector;