// Review.tsx
import React from 'react';
import '../../styles/review/Review.scss';
import { formatDate } from '../../utils/formatDate';

interface ReviewItemProps {
  reviewId: number;
  reviewContent: string;
  star: number;
  createdAt: string;
  likeCount: number;
  placeName?: string;
  profileImg?: string;
  nickname?: string;
  showPlaceName?: boolean;
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
  showPlaceName = true,
}) => (
  <div className="review-wrap" key={reviewId}>
    {showPlaceName && (
      <h3>
        <span className="xi-maker"></span>
        {placeName}
      </h3>
    )}
    <button className="delete-btn">삭제</button>
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

export default Review;
