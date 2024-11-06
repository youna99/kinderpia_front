// Review.tsx
import React, { useState } from 'react';
import '../../styles/review/Review.scss';
import { formatDate } from '../../utils/formatDate';
import { confirmAlert, simpleAlert } from '../../utils/alert';
import { deleteReview, postLike } from '../../api/review';
import { postReportBadContent } from '../../api/report';
import ReportBox from '../common/ReportBox';
import { AxiosError } from 'axios';

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
  likedByUser?: boolean; // 내가 도움됨을 눌렀는지
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
  likedByUser = true, // 마이페이지에서는 기본값 true
}) => {
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount); // like 총 수
  const [isLiked, setIsLiked] = useState(likedByUser); // like 버튼 토글
  const [showReportModal, setShowReportModal] = useState(false); // 신고하기박스 토글
  // const [reportToggle, setReportToggle] = useState(true); // 신고된 리뷰인지 아닌지

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

  // 도움됨 버튼 클릭
  const handleLike = async () => {
    try {
      const data = await postLike(reviewId);
      console.log('like data>>>', data);

      // 상태 업데이트
      setIsLiked((prev) => !prev);
      setCurrentLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      simpleAlert('error', '도움됨에 실패했습니다.');
    }
  };

  // 신고사유선택 모달
  const handleReportReview = async () => {
    setShowReportModal(true);
  };

  // 신고하기
  const handleReport = async (
    reportReasonId: number,
    reportMessageContent: string
  ) => {
    console.log('reportReasonId >>>>', reportReasonId);
    console.log('reportMessageContent >>>', reportMessageContent);

    try {
      const response = await postReportBadContent({
        reviewId,
        reportReasonId,
        reportMessageContent,
      });
    } catch (error) {
      console.error('리뷰 신고 처리 중 오류 발생:', error);
      if ((error as AxiosError).response?.status === 409) {
        simpleAlert('error', '이미 신고한 리뷰입니다.');
        setShowReportModal(false);
      } else {
        simpleAlert('error', '신고처리에 실패했습니다. 다시 시도해주세요.');
      }
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
      {/* {isOwner ? (
        <button className="delete-btn" onClick={handleDeleteReview}>
          삭제
        </button>
      ) : !reportToggle ? (
        <div className="reported-text">신고된 리뷰입니다.</div>
      ) : (
        <button className="report-btn" onClick={handleReportReview}>
          🚨 신고
        </button>
      )} */}
      {isOwner ? (
        <button className="delete-btn" onClick={handleDeleteReview}>
          삭제
        </button>
      ) : (
        <button className="report-btn" onClick={handleReportReview}>
          🚨 신고
        </button>
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
          {isLiked ? (
            <div className="like">
              <span className="xi-check"></span>
              <div>도움됨</div>
            </div>
          ) : (
            <span className="nolike">도움이 돼요</span>
          )}
        </p>
        <p>{currentLikeCount}명에게 도움이 되었습니다</p>
      </div>

      {showReportModal && (
        <ReportBox
          onClose={() => setShowReportModal(false)}
          onSubmit={handleReport}
          targetId={Number(reviewId)}
        />
      )}
    </div>
  );
};

export default Review;
