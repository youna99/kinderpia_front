interface ParticipateInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const ParticipateInput: React.FC<ParticipateInputProps> = ({ value, onChange }) => {
  const handleChange = (action: 'increment' | 'decrement') => {
    if (action === 'increment' && value < 10) {
      onChange(value + 1);
    } else if (action === 'decrement' && value > 1) {
      onChange(value - 1);
    }
  };

  return (
    <div className="mb-4 p-4 border rounded">
      <div className="flex items-center justify-between">
        <span className="text-sm">참여 인원</span>
        <div className="flex items-center gap-4">
          <button 
            className="w-8 h-8 border rounded flex items-center justify-center disabled:opacity-50"
            onClick={() => handleChange('decrement')}
            disabled={value <= 1}
          >
            -
          </button>
          <span>{value}</span>
          <button 
            className="w-8 h-8 border rounded flex items-center justify-center disabled:opacity-50"
            onClick={() => handleChange('increment')}
            disabled={value >= 10}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};