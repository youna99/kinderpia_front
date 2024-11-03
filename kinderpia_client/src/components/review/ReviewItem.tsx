import React, { useState } from 'react'
import defaultIcon from '../../assets/images/tempIcon1.png';
import '../../styles/review/ReviewItem.scss';
import ReportBox from '../common/ReportBox';

interface ReviewItemProps {
  data: {
    review: {
      reviewId: number;
      star: number;
      reviewContent: string;
      createdAt: string;
      updatedAt: string;
      deleted: boolean;
    };
    nickname: string;
    profileImg: string;
    likeCount: number;
    blacklist: boolean;
  };
}

const ReviewItem: React.FC<ReviewItemProps> = ({ data }) => {
  const { review, nickname, profileImg, likeCount } = data;
  const [showReportModal, setShowReportModal] = useState(false);

  const handleReport = (reason: string, message: string) => {
    console.log('신고 사유:', reason);
    console.log('상세 내용:', message);
    console.log('리뷰 ID:', review.reviewId);
    
    setShowReportModal(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className='review-item-container'>
      <div className='review-item-header'>
        <div className='review-item-header-profile'>
          <img 
            src={profileImg || defaultIcon}
            alt={`${nickname}의 프로필`}
          />
        </div>
        <div className='review-item-header-info'>
          <div className='review-item-header-info-nickname'>
            {nickname}
          </div>
          <div className='review-item-header-info-wrapper'>
            <div className='review-item-header-info-wrapper-star'>
              {review.star}점
            </div>
            <div className='review-item-header-info-wrapper-date'>
              {formatDate(review.createdAt)}
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
        {review.reviewContent}
      </div>
      <div className='review-item-action'>
        <div className='review-item-like'>
          좋아요 {likeCount}
        </div>
        <div className='review-item-action-btn'>
          수정/삭제
        </div>
      </div>
      <hr/>
      {showReportModal && (
        <ReportBox
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReport}
          targetId={String(review.reviewId)}
        />
      )}
    </div>
  );
};

export default ReviewItem;