interface JoinMethodProps {
  value: boolean;
  onChange: (requiresApproval: boolean) => void;
}


const JoinMethodInput: React.FC<JoinMethodProps> = ({ 
  value, 
  onChange 
}) => {
  return (
    <div className="join-method-container">
      <h2 className="join-method-title">신청 방식</h2>
      <div className="join-method-options">
        <div className="option-item">
          <label>
            <input 
              type="radio"
              name="joinMethod"
              value="free"
              checked={!value}
              onChange={() => onChange(false)}
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
              onChange={() => onChange(true)}
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