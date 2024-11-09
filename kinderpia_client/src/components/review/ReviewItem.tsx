import React, { useState, useEffect } from 'react';
import defaultIcon from '../../assets/images/tempIcon1.png';
import '../../styles/review/ReviewItem.scss';
import ReportBox from '../common/ReportBox';
import { ReviewData } from '../../types/review';

interface ReviewItemProps {
  data: ReviewData;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ data }) => {
  const { review, nickname, profileImg, likeCount } = data;
  const [showReportModal, setShowReportModal] = useState(false);

  const handleReport = async (
    reason: number,
    message: string
  ): Promise<void> => {
    try {
      console.log('신고 사유:', reason);
      console.log('상세 내용:', message);
      console.log('리뷰 ID:', review.reviewId);

      setShowReportModal(false);
    } catch (error) {
      console.error('신고 처리 중 오류 발생:', error);
      alert('신고 처리 중 오류가 발생했습니다.');
    }
  };

  const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
      <div className="review-item-header-info-wrapper-item-star">
        {[...Array(5)].map((_, index) => (
          <i key={index} className={index < rating ? 'xi-star' : 'xi-star-o'} />
        ))}
      </div>
    );
  };

  useEffect(() => {
    console.log('Review Data:', data);
  }, [data]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="review-item-container">
      <div className="review-item-header">
        <div className="review-item-header-profile">
          <img src={profileImg || defaultIcon} alt={`${nickname}의 프로필`} />
        </div>
        <div className="review-item-header-info">
          <div className="review-item-header-info-nickname">{nickname}</div>
          <div className="review-item-header-info-wrapper">
            <div className="review-item-header-info-wrapper-item">
              <StarRating rating={review.star} />
              <div className="review-item-header-info-wrapper-item-date">
                {formatDate(review.createdAt)}
              </div>
            </div>
            <div
              className="review-item-header-info-wrapper-report"
              onClick={() => setShowReportModal(true)}
              role="button"
              tabIndex={0}
            >
              신고하기
            </div>
          </div>
        </div>
      </div>
      <div className="review-item-content">{review.reviewContent}</div>
      <div className="review-item-action">
        <div className="review-item-action-btn">수정/삭제</div>
        <div className="review-item-action-like">
          {likeCount} 명이 이 리뷰가 유용하다고 응답했어요!
        </div>
      </div>
      <hr />
      {showReportModal && (
        <ReportBox
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReport}
          targetId={review.reviewId}
        />
      )}
    </div>
  );
};

export default ReviewItem;
