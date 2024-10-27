interface TitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const TitleInput: React.FC<TitleInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2">모임 유형을 선택해주세요.</label>
      <input 
        className="w-full p-2 border rounded"
        placeholder="소목적 먹방 / 차담 및 음료 / 교류 및 담소 / 체험 및 활동 / 스포츠 활동 / 기타"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};