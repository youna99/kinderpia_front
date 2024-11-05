import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import type { Value } from 'react-calendar/dist/cjs/shared/types';
import 'react-calendar/dist/Calendar.css';
import '../../styles/meeting/createpage/CalanderSelector.scss';
import CheckMarker from '../common/CheckMarker';

interface CalanderSelectorProps {
  meetingTime: string;
  onDateChange: (value: string) => void;
}

const CalanderSelector: React.FC<CalanderSelectorProps> = ({ 
  meetingTime,
  onDateChange
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    meetingTime ? new Date(meetingTime) : new Date()
  );
  const [selectedTime, setSelectedTime] = useState('12:00');

  const formatDateTime = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = '00';
  
    // 서버가 요구하는 "yyyy-MM-dd HH:mm:ss" 형식으로 변경
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  
  const combineDateTime = (date: Date, timeStr: string): string => {
    const [hours, minutes] = timeStr.split(':');
    const newDate = new Date(date);
    newDate.setHours(parseInt(hours), parseInt(minutes), 0);
    return formatDateTime(newDate);
  };

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      onDateChange(combineDateTime(value, selectedTime));
    }
  };

  const handleTimeChange = (value: string) => {
    setSelectedTime(value);
    onDateChange(combineDateTime(selectedDate, value));
  };

  useEffect(() => {
    if (meetingTime) {
      const date = new Date(meetingTime);
      setSelectedDate(date);
      const timeString = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      setSelectedTime(timeString);
    }
  }, [meetingTime]);

  return (
    <div className="calander-selector-container">
      <div className='calander-selector-header'>
        <label className="calander-selector-header-title">모임 일시<span className='xi-check'> </span></label>
        <CheckMarker value={meetingTime} />
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
          value={selectedTime}
          onChange={(e) => handleTimeChange(e.target.value)}
          className="time-input"
        />
      </div>
    </div>
  );
};

export default CalanderSelector;