interface CalanderSelectorProps {
  date: string;
  time: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
}

export const CalanderSelector: React.FC<CalanderSelectorProps> = ({ 
  date, 
  time, 
  onDateChange, 
  onTimeChange 
}) => {
  return (
    <div className="calander-container">
      <label className="calander-title">모임 일시</label>
      <div className="calander-content">
        <div className="calander-selector">
          <input 
            type="date"
            className="calander-date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
          />
          <input 
            type="time"
            className="calander-time"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};