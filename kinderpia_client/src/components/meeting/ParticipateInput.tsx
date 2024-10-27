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
    <div className="participate-container">
      <span className="participate-title">참여 인원</span>
      <div className="participate-input">
        <button 
          className="participate-minus-btn"
          onClick={() => handleChange('decrement')}
          disabled={value <= 1}
        >
          -
        </button>
        <span>{value}</span>
        <button 
          className="participate-plus-btn"
          onClick={() => handleChange('increment')}
          disabled={value >= 10}
        >
          +
        </button>
      </div>
    </div>
  );
};