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
    <div className="mb-4">
      <label className="block text-sm mb-2">모임 일시</label>
      <div className="p-4 border rounded">
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="date"
            className="p-2 border rounded"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
          />
          <input 
            type="time"
            className="p-2 border rounded"
            value={time}
            onChange={(e) => onTimeChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};