interface ParticipateInputProps {
  value: number;
  onChange: (value: number) => void;
  hasLimit: boolean;
  onLimitChange: (hasLimit: boolean) => void;
  min?: number;
  max?: number;
}

const ParticipateInput: React.FC<ParticipateInputProps> = ({ 
  value, 
  onChange,
  hasLimit,
  onLimitChange,
  min = 1,
  max = 10 
}) => {
  const handleChange = (action: 'increment' | 'decrement') => {
    if (!hasLimit) return;
    
    if (action === 'increment' && value < max) {
      onChange(value + 1);
    } else if (action === 'decrement' && value > min) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'radio') {
      const newHasLimit = e.target.value === 'limit';
      onLimitChange(newHasLimit);
      if (!newHasLimit) {
        onChange(0);
      } else {
        onChange(min);
      }
      return;
    }

    if (!hasLimit) return;

    const newValue = parseInt(e.target.value);
    if (isNaN(newValue)) return;
    
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="participate-container">
      <span className="participate-title">참여 인원</span>
      <div className="participate-input">
        <div className="participate-radio-group">
          <label>
            <input 
              type="radio" 
              name="participateLimit"
              value="unlimited"
              checked={!hasLimit}
              onChange={handleInputChange}
            />
            제한 없음
          </label>
          <label>
            <input 
              type="radio" 
              name="participateLimit"
              value="limit"
              checked={hasLimit}
              onChange={handleInputChange}
            />
            {hasLimit && (
              <div className="participate-number-input">
                <button 
                  onClick={() => handleChange('decrement')}
                  disabled={value <= min}
                >
                  -
                </button>
                <input 
                  type="number"
                  value={value}
                  onChange={handleInputChange}
                  min={min}
                  max={max}
                  disabled={!hasLimit}
                />
                <button 
                  onClick={() => handleChange('increment')}
                  disabled={value >= max}
                >
                  +
                </button>
              </div>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default ParticipateInput;