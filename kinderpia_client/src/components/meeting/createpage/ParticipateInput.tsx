import '../../../styles/meeting/createpage/ParticipateInput.scss';
import CheckMarker from '../../common/CheckMarker';

interface ParticipateInputProps {
  value: number;
  onChange?: (value: number) => void;
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
  max = 20,
}) => {
  const handleChange = (action: 'increment' | 'decrement') => {
    if (!hasLimit) return;

    if (action === 'increment' && value < max) {
      onChange && onChange(value + 1);
    } else if (action === 'decrement' && value > min) {
      onChange && onChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === 'radio') {
      const newHasLimit = e.target.value === 'limit';
      onLimitChange(newHasLimit);
      if (!newHasLimit) {
        onChange && onChange(99);
      } else {
        onChange && onChange(min);
      }
      return;
    }

    if (!hasLimit) return;

    const newValue = parseInt(e.target.value);
    if (isNaN(newValue)) return;

    if (newValue >= min && newValue <= max) {
      onChange && onChange(newValue);
    }
  };

  return (
    <div className="participate-input-container">
      <div className="participate-input-header">
        <label className="participate-input-header-title">
          참여 인원<i className="xi-check"></i>
        </label>
        <CheckMarker value={value} />
      </div>
      <hr />
      <div className="participate-input-input">
        <div className="participate-input-radio-group">
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
            <div className="participate-input-number-input">
              <button
                onClick={() => handleChange('decrement')}
                disabled={value <= min}
                type="button"
              >
                -
              </button>
              <input
                type="number"
                value={value}
                onChange={handleInputChange}
                min={min}
                max={max}
              />
              <button
                onClick={() => handleChange('increment')}
                disabled={value >= max}
                type="button"
              >
                +
              </button>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ParticipateInput;
