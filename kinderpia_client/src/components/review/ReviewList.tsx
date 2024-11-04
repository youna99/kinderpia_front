import React, { useEffect, useState } from 'react'
import { Review, ReviewsResponse } from '../../types/reiew';
import { getReviewList } from '../../api/review';
import '../../styles/review/ReviewList.scss';
import ReviewItem from './ReviewItem'

interface ReviewListProps {
  placeId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ placeId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
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
        if (reviewData.reviews) {
          setReviews(reviewData.reviews);
          console.log('reviews >>>> ', reviewData.reviews);
          console.log('averageStar >>>> ', reviewData.averageStar);
        } else {
          setReviews([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : '리뷰를 불러오는데 실패했습니다.');
        console.error('리뷰 로딩 에러:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [placeId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (reviews.length === 0) return <div className='review-list-404'>작성된 리뷰가 없습니다.</div>;

  return (
    <div className='review-list-container'>
      <hr/>
      {reviews.map((reviewData) => (
        <ReviewItem
          key={reviewData.review.reviewId}
          data={reviewData}
        />
      ))}
    </div>
  );
};

export default ReviewList;