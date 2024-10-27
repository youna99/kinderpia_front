interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const TitleInput: React.FC<TitleInputProps> = ({ value, onChange }) => {
  return (
    <div className="titleinput-container">
      <label className="titleinput-title">모임 유형을 선택해주세요.</label>
      <input 
        className="titleinput-input"
        placeholder="오락 및 여가 / 자연 및 환경 / 교육 및 문화 / 체험 및 활동 / 스포츠 및 운동 / 기타"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};