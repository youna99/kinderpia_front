import '../../../styles/meeting/createpage/TitleInput.scss';
import CheckMarker from '../../common/CheckMarker';

interface TitleInputProps {
  value: string;
  onChange?: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
}

const TitleInput: React.FC<TitleInputProps> = ({
  value,
  onChange,
  maxLength = 20,
  placeholder = '모임 제목을 입력해주세요',
}) => {
  const currentLength = value.length;

  return (
    <div className="title-input-container">
      <div className='title-input-header'>
        <label className="title-input-header-title">
          모임 명<span> *</span>
        </label>
        <CheckMarker
          value={value}
        />
      </div>
      <hr />
      <div className="title-input-wrapper">
        <input
          type="text"
          className="title-input-wrapper-input"
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= maxLength) {
              onChange && onChange(e.target.value);
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
