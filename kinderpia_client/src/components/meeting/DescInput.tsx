interface DescInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const DescInput: React.FC<DescInputProps> = ({ value, onChange }) => {
  return (
    <div className="descinput-container">
      <label className="descinput-title">모임 글을 작성해주세요.</label>
      <textarea
        className="descinput-input"
        placeholder="모임에 대해 설명해주세요..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};