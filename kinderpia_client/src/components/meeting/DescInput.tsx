
import '../../styles/meeting/DescInput.scss';
interface DescInputProps {
  value: string;
  onChange: (value: string) => void;
}

const DescInput: React.FC<DescInputProps> = ({ 
  value, onChange 
}) => {
  return (
    <div className="desc-input-container">
      <label className="desc-input-title">모임 글을 작성해주세요.<span> *</span></label>
      <hr/>
      <textarea
        className="desc-input-textarea"
        placeholder="모임의 활동 내용에 대해서 설명 해주세요..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default DescInput;