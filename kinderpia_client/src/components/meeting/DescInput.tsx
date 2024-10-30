import '../../styles/meeting/createpage/DescInput.scss';
import CheckMarker from '../common/CheckMarker';
interface DescInputProps {
  value: string;
  onChange?: (value: string) => void;
}

const DescInput: React.FC<DescInputProps> = ({ value, onChange }) => {
  return (
    <div className="desc-input-container">
      <div className='desc-input-header'>
        <label className="desc-input-header-title">
          모임 소개<span> *</span>
        </label>
        <CheckMarker
          value={value}
        />
      </div>
      <hr />
      <textarea
        className="desc-input-textarea"
        placeholder="모임의 활동 내용에 대해서 설명 해주세요..."
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  );
};

export default DescInput;
