import React, { useEffect, useState } from 'react';
import { ReviewData, ReviewsResponse } from '../../types/review';
import { getReviewList } from '../../api/review';
import '../../styles/review/ReviewList.scss';
// import ReviewItem from './ReviewItem';
import Review from './Review';
import { extractUserIdFromCookie } from '../../utils/extractUserIdFromCookie';

interface ReviewListProps {
  placeId: string;
  reviewcreate: boolean;
  reviewdelete: boolean;
  onDelete: (reviewId: number) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({
  placeId,
  reviewcreate,
  onDelete,
  reviewdelete,
}) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getReviewList(Number(placeId));
        console.log('response >>>> ', response);

        // 중첩된 데이터 구조에 맞게 접근
        const reviewData = response.data;
        console.log('reviewData >>>', reviewData);

        if (reviewData.reviews) {
          setReviews(reviewData.reviews);
          console.log('reviewData.reviews >>>> ', reviewData.reviews);

          console.log('averageStar >>>> ', reviewData.averageStar);
        } else {
          setReviews([]);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : '리뷰를 불러오는데 실패했습니다.'
        );
        console.error('리뷰 로딩 에러:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [placeId, reviewcreate, reviewdelete]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (reviews.length === 0)
    return <div className="review-list-404">작성된 리뷰가 없습니다.</div>;

  const currentUserId = extractUserIdFromCookie();
  console.log('currentUserId >>>', currentUserId);

  return (
    <div className="review-list-container">
      <hr />
      {reviews.map((reviewData) => (
        <Review
          key={reviewData.review.reviewId}
          reviewId={reviewData.review.reviewId}
          reviewContent={reviewData.review.reviewContent}
          star={reviewData.review.star}
          createdAt={reviewData.review.createdAt}
          likeCount={reviewData.likeCount}
          profileImg={reviewData.profileImg || '/images/usericon.png'}
          nickname={reviewData.nickname}
          showPlaceName={false}
          isOwner={currentUserId === String(reviewData.userId)}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ReviewList;
