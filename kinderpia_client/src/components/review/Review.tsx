// Review.tsx
import React from 'react';
import '../../styles/review/Review.scss';
import { formatDate } from '../../utils/formatDate';
import { confirmAlert, simpleAlert } from '../../utils/alert';
import { deleteReview } from '../../api/review';

interface ReviewItemProps {
  reviewId: number;
  reviewContent: string;
  star: number;
  createdAt: string;
  likeCount: number;
  placeName?: string;
  profileImg?: string;
  nickname?: string;
  showPlaceName?: boolean; // 장소상세페이지에서 placeName 안보이기
  onClick?: () => void; // onClick 프로퍼티 추가(선택)
  onDelete?: (reviewId: number) => void; // onDelete 프로퍼티 추가
}

const Review: React.FC<ReviewItemProps> = ({
  reviewId,
  reviewContent,
  star,
  createdAt,
  likeCount,
  placeName,
  profileImg = '/images/usericon.png',
  nickname = '닉네임',
  showPlaceName = true, // 마이페이지에서는 기본값으로 설정
  onClick, // onClick 프로퍼티 받기
  onDelete,
}) => {
  const handleDeleteReview = async () => {
    const confirmed = await confirmAlert(
      'warning',
      '리뷰를 삭제하시겠습니까?',
      '삭제한 리뷰는 복구할 수 없습니다.'
    );
    if (confirmed) {
      try {
        await deleteReview(reviewId);
        simpleAlert('success', '삭제되었습니다.');
        // 부모 컴포넌트의 삭제 함수 호출
        if (onDelete) {
          onDelete(reviewId);
        }
      } catch (error) {
        simpleAlert('error', '삭제에 실패했습니다. 다시 시도하세요.');
      }
    }
  };

  return (
    <div className="review-wrap" key={reviewId}>
      {showPlaceName && (
        <h3 onClick={onClick}>
          <span className="xi-maker"></span>
          {placeName}
        </h3>
      )}
      <button className="delete-btn" onClick={handleDeleteReview}>
        삭제
      </button>
      <button className="report-btn">🚨 신고</button>
      <div className="star-wrap">
        <div>
          {[...Array(star)].map((_, index) => (
            <span key={index} className="xi-star"></span>
          ))}
        </div>
        <span>{star}</span>
      </div>
      <p className="review-content">{reviewContent}</p>
      <div className="write-txt">
        <span className="user-profile">
          <img src={profileImg} alt="" />
          <h4>{nickname}</h4>
        </span>
        <span className="createdAt">{formatDate(createdAt)}</span>
      </div>
      <div className="like-count-wrap">
        <p className="like-pin">
          <span className="xi-check"></span>도움됨
        </p>
        <p>{likeCount}명에게 도움이 되었습니다</p>
      </div>
    </div>
  );
};

export default Review;
