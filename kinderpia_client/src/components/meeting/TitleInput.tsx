import '../../styles/meeting/TitleInput.scss';

interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
}

const TitleInput: React.FC<TitleInputProps> = ({ 
  value, 
  onChange,
  maxLength = 20,
  placeholder = "모임 제목을 입력해주세요" 
}) => {
  const currentLength = value.length;

  return (
    <div className="title-input-container">
      <label className="title-input-title">모임 명<span> *</span></label>
      <hr/>
      <div className="title-input-wrapper">
        <input 
          type="text"
          className="title-input-wrapper-input"
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              onChange(e.target.value);
            }
          }}
          maxLength={maxLength}
          placeholder={placeholder}
        />
        <div className="title-input-wrapper-length">
          <span>{currentLength}</span>
          <span>/{maxLength}</span>
        </div>
      </div>
    </div>
  );
};

export default TitleInput;