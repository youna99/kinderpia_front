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

  // 날짜와 시간을 조합하여 ISO 문자열로 변환
  const combineDateTime = (date: Date, timeStr: string): string => {
    const [hours, minutes] = timeStr.split(':');
    const newDate = new Date(date);
    newDate.setHours(parseInt(hours), parseInt(minutes), 0);
    return newDate.toISOString(); // ISO 형식으로 변환 (서버에서 LocalDateTime으로 파싱 가능)
  };

  const handleDateChange = (value: Value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      onDateChange(combineDateTime(value, selectedTime));
    }
  };

  const handleTimeChange = (timeStr: string) => {
    setSelectedTime(timeStr);
    onDateChange(combineDateTime(selectedDate, timeStr));
  };

  // // 컴포넌트 마운트 시 초기값 설정
  // useEffect(() => {
  //   if (!meetingTime) {
  //     onDateChange(combineDateTime(selectedDate, selectedTime));
  //   }
  // }, []);

  return (
    <div className="calander-selector-container">
      <div className='calander-selector-header'>
        <label className="calander-selector-header-title">모임 일시<span> *</span></label>
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