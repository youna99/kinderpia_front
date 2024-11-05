import '../../../styles/meeting/createpage/JoinMethodInput.scss';
import CheckMarker from '../../common/CheckMarker';

interface JoinMethodProps {
  value: boolean;
  onChange?: (requiresApproval: boolean) => void;
  disabled?: boolean;
  isRequired?: boolean; // 필수 여부(*)를 결정하는 prop 추가
}

const JoinMethodInput: React.FC<JoinMethodProps> = ({
  value,
  onChange,
  isRequired = true, // 기본값을 true로 설정
}) => {
  return (
    <div className="join-method-container">
      <div className="join-method-header">
        <label className="join-method-header-title">
          신청 방식{isRequired && <span> *</span>}
        </label>
        <CheckMarker value={value} />
      </div>
      <hr />
      <div className="join-method-options">
        <div className="option-item">
          <label>
            <input
              type="radio"
              name="joinMethod"
              value="free"
              checked={!value}
              onChange={() => onChange && onChange(false)}
            />
            <div className="option-content">
              <div className="option-text">
                <strong>자유 참가</strong>
                <p>개설자의 승인 없이 참가할 수 있어요</p>
              </div>
            </div>
          </label>
        </div>

        <div className="option-item">
          <label>
            <input
              type="radio"
              name="joinMethod"
              value="approval"
              checked={value}
              onChange={() => onChange && onChange(true)}
            />
            <div className="option-content">
              <div className="option-text">
                <strong>승인 필요</strong>
                <p>모임에 참가하려면 개설자의 승인이 필요해요</p>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default JoinMethodInput;
