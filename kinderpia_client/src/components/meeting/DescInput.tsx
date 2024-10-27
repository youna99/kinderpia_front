interface DescInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const DescInput: React.FC<DescInputProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2">모임 글을 작성해주세요.</label>
      <textarea
        className="w-full h-32 p-2 border rounded resize-none"
        placeholder="모임에 대해 설명해주세요..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};