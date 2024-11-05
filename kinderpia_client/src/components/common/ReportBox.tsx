import React, { useState, useEffect } from 'react'
import '../../styles/common/ReportBox.scss';

interface ReportBoxProps {
  onClose: () => void;
  onSubmit: (reportReasonId: number, reportMessageContent: string) => Promise<void>;  // Promise 타입 추가 및 string -> number
  targetId: number;
}

const ReportBox: React.FC<ReportBoxProps> = ({
  onClose,
  onSubmit,
  targetId
}) => {
  // reportReason을 number 타입으로 변경
  const [reportReason, setReportReason] = useState<number>(0);
  const [reportMessage, setReportMessage] = useState<string>('');

  // 배경 클릭 시 모달 닫기
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const reportReasons = [
    { 
      id: 1, 
      text: '스팸/광고/홍보', 
    },
    { 
      id: 2, 
      text: '욕설/혐오/비하',
    },
    { 
      id: 3, 
      text: '사기/허위정보',
    },
    { 
      id: 4, 
      text: '개인정보 노출',
    },
    { 
      id: 5, 
      text: '음란물/유해 컨텐츠',
    },
    { 
      id: 6, 
      text: '기타',
    }
  ];

  const handleSubmit = () => {
    if (!reportReason) {
      alert('신고 사유를 선택해주세요.');
      return;
    }
    if (!reportMessage.trim()) {
      alert('신고 내용을 입력해주세요.');
      return;
    }
    onSubmit(reportReason, reportMessage); // 숫자 그대로 전달
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
            <label key={reason.id} className='report-radio'>
              <input
                type='radio'
                name='reportReason'
                value={reason.id}
                checked={reportReason === reason.id}
                onChange={(e) => setReportReason(Number(e.target.value))}
              />
              <span className='radio-label'>{reason.text}</span>
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
            신고
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