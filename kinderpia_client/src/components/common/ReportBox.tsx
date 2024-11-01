import React, { useState, useEffect } from 'react'
import '../../styles/common/ReportBox.scss';

interface ReportBoxProps{
  onClose: () => void;
  onSubmit: (reason: string, message: string) => void;
  targetId : string;
}

const ReportBox:React.FC<ReportBoxProps> = ({
  onClose, 
  onSubmit,
  targetId
}) => {
  const [reportReason, setReportReason] = useState<string>('');
  const [reportMessage, setReportMessage] = useState<string>('');
  
  const reportReasons = [
    '욕설, 비방, 차별, 혐오',
    '불법정보',
    '음란, 청소년 유해',
    '도배, 스팸',
    '기타'
  ];

  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    document.body.classList.add('modal-open');
    
    // 컴포넌트가 언마운트될 때 클래스 제거
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  // 배경 클릭 시 모달 닫기
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = () => {
    if (!reportReason) {
      alert('신고 사유를 선택해주세요.');
      return;
    }
    if (!reportMessage.trim()) {
      alert('신고 내용을 입력해주세요.');
      return;
    }
    onSubmit(reportReason, reportMessage);
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscClose);
    return () => window.removeEventListener('keydown', handleEscClose);
  }, [onClose]);

  return (
    <div className='report-modal-overlay' onClick={handleOverlayClick}>
      <div className='report-modal' onClick={e => e.stopPropagation()}>
        <div className='report-modal-header'>
          <h3>
            <span className='report-icon'>🚩</span> 
            신고하기
          </h3>
          <p className='report-subtitle'>신고사유 선택</p>
        </div>

        <div className='report-modal-content'>
          {reportReasons.map((reason) => (
            <label key={reason} className='report-radio'>
              <input
                type='radio'
                name='reportReason'
                value={reason}
                checked={reportReason === reason}
                onChange={(e) => setReportReason(e.target.value)}
              />
              <span className='radio-label'>{reason}</span>
            </label>
          ))}
        </div>
        <div className='report-textarea-container'>
          <p className='textarea-label'>상세 신고 사유</p>
          <textarea
            className='report-textarea'
            value={reportMessage}
            onChange={(e) => setReportMessage(e.target.value)}
            placeholder="신고 사유를 자세히 작성해주세요."
            rows={4}
            maxLength={500}
          />
          <span className='textarea-counter'>
            {reportMessage.length}/500
          </span>
        </div>
        <p className='report-question'>이 게시글을 신고하시겠습니까?</p>

        <div className='report-modal-actions'>
          <button 
            className='confirm-btn'
            onClick={handleSubmit}
          >
            확인
          </button>
          <button 
            className='cancel-btn'
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportBox;