import React, { useState, useEffect } from 'react';

import '../../styles/meeting/CalanderSelector.scss';
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
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendar, setCalendar] = useState<Date[]>([]);

  // 달력 데이터 생성
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());
    
    const calendarDays: Date[] = [];
    const day = new Date(startDate);
    
    while (day <= lastDay || day.getDay() !== 0) {
      calendarDays.push(new Date(day));
      day.setDate(day.getDate() + 1);
    }
    
    setCalendar(calendarDays);
  }, [currentMonth]);

  const handlePrevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const handleNextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const handleDateClick = (selectedDate: Date) => {
    // YYYY-MM-DD 형식으로 변환
    const formattedDate = selectedDate.toISOString().split('T')[0];
    onDateChange(formattedDate);
  };

  return (
    <div className="datetime-picker">
      <label className="datetime-label">모임 일시</label>
      
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>&lt;</button>
          <h2>
            {currentMonth.toLocaleString('ko-KR', { 
              year: 'numeric',
              month: 'long'
            })}
          </h2>
          <button onClick={handleNextMonth}>&gt;</button>
        </div>
        
        <div className="calendar-grid">
          <div className="weekdays">
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <div key={day} className="weekday">{day}</div>
            ))}
          </div>
          
          <div className="days">
            {calendar.map((day, index) => {
              const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
              const isSelected = day.toISOString().split('T')[0] === date;
              
              return (
                <div
                  key={index}
                  className={`day ${
                    isCurrentMonth ? 'current-month' : 'other-month'
                  } ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleDateClick(day)}
                >
                  {day.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="time-picker">
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