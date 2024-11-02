import React,{useState} from 'react'
import { ReviewData } from '../../types/place';
import defaultIcon from '../../assets/images/tempIcon1.png';

// 스타일 호출
import '../../styles/review/ReviewItem.scss';
import ReportBox from '../common/ReportBox';

interface ReviewItemProps {
  data: ReviewData;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ data }) => {
  const { writer, writerIcon, content, star, createdAt } = data;
  const [ showReportModal, setShowReportModal] = useState(false);

  const handleReport = (reason: string, message: string,) => {
    // 신고 처리 로직
    console.log('신고 사유:', reason);
    console.log('상세 내용:', message);
    
    setShowReportModal(false);
  };

  return (
    <div className='review-item-container'>
      <div className='review-item-header'>
        <div className='review-item-header-profile'>
          <img 
            src={defaultIcon}
            alt={`${writer}의 프로필`}
          />
        </div>
        <div className='review-item-header-info'>
          <div className='review-item-header-info-nickname'>
            {writer}
          </div>
          <div className='review-item-header-info-wrapper'>
            <div className='review-item-header-info-wrapper-star'>
              {star}점
            </div>
            <div className='review-item-header-info-wrapper-date'>
              {createdAt}
            </div>
            <div 
              className='review-item-header-info-wrapper-report'
              onClick={() => setShowReportModal(true)}
              role="button"
              tabIndex={0}
            >
              신고하기
            </div>
          </div>
        </div>
      </div>
      <div className='review-item-content'>
        {content}
      </div>
      <div className='review-item-action'>
        <div className='review-item-action-btn'>
          수정/삭제
        </div>
      </div>
      <hr/>
      {/* 모달을 container 바깥으로 이동 */}
      {showReportModal && (
        <ReportBox
          onClose={() => setShowReportModal(false)}
          onSubmit={ handleReport }
          targetId={ String(data.id) }
        />
      )}
    </div>
  )
}

export default ReviewItem