// Review.tsx
import React, { useState } from 'react';
import '../../styles/review/Review.scss';
import { formatDate } from '../../utils/formatDate';
import { confirmAlert, simpleAlert } from '../../utils/alert';
import { deleteReview, postLike } from '../../api/review';

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
  isOwner?: boolean; // 현재 사용자와 리뷰 글쓴이가 같은지
  onDelete?: (reviewId: number) => void; // 삭제가 되었는지 (삭제하면 목록 바로 업데이트 되게 할려고 추가)
  onReviewClick?: () => void;
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
  showPlaceName = true, // 마이페이지에서는 기본값 true
  onClick, // onClick 프로퍼티 받기
  isOwner = true, // 마이페이지에서는 기본값 true
  onDelete,
  onReviewClick,
}) => {
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount); // like 총 수
  const [isLiked, setIsLiked] = useState(false); // like 버튼 토글

  // 리뷰 삭제
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
        if (onDelete) onDelete(reviewId);
      } catch (error) {
        simpleAlert('error', '삭제에 실패했습니다. 다시 시도하세요.');
      }
    }
  };

  // 도움됨
  const handleLike = async () => {
    try {
      const data = await postLike(reviewId);
      console.log('data>>>', data);

      setIsLiked(!isLiked);
      setCurrentLikeCount(
        isLiked ? currentLikeCount - 1 : currentLikeCount + 1
      );
    } catch (error) {
      simpleAlert('error', '도움됨에 실패했습니다.');
    }
  };

  return (
    <div className="review-wrap" key={reviewId}>
      {showPlaceName && (
        <h3 onClick={onReviewClick}>
          <span className="xi-maker"></span>
          {placeName}
        </h3>
      )}
      {isOwner ? (
        <button className="delete-btn" onClick={handleDeleteReview}>
          삭제
        </button>
      ) : (
        <button className="report-btn">🚨 신고</button>
      )}
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
        <p
          className={`like-pin ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <span className="xi-check"></span>도움됨
        </p>
        <p>{currentLikeCount}명에게 도움이 되었습니다</p>
      </div>
    </div>
  );
};

export default Review;
