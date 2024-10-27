interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;  // 최대 글자수 제한
  placeholder?: string;  // placeholder 텍스트
}

const TitleInput: React.FC<TitleInputProps> = ({ 
  value, 
  onChange,
  maxLength = 20,
  placeholder = "모임 제목을 입력해주세요" 
}) => {
  const currentLength = value.length;

  return (
    <div className="titleinput-container">
      <label className="titleinput-title">모임 명을 적어주세요.</label>
      <input 
        type="text"
        className="titleinput-input"
        value={value}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            onChange(e.target.value);
          }
        }}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      {/* 텍스트 인풋창에 글자수 제한을 표시하기 위해서  */}
      <div className="titleinput-length"> 
        <span>{currentLength}</span>
        <span>/{maxLength}</span>
      </div>
    </div>
  );
};

export default TitleInput;