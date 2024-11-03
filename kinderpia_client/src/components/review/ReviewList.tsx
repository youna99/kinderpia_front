import React, { useEffect, useState } from 'react'
import { ReviewData, ReviewResponse } from '../../types/reiew';
import { getReviewList } from '../../api/review';
import '../../styles/review/ReviewList.scss';
import ReviewItem from './ReviewItem'

import { transformedReviews } from '../../data/tempReviewList';

interface ReviewListProps {
  placeId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ placeId }) => {
  // reviews의 초기값을 빈 배열로 설정
  const [reviewData, setReviewData] = useState<{ reviews: ReviewData[]; averageStar: number }>({
    reviews: [],
    averageStar: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await getReviewList(Number(placeId));
        // response.data.reviews가 확실히 존재하는지 확인
        if (response?.data?.reviews) {
          setReviewData({
            reviews: response.data.reviews,
            averageStar: response.data.averageStar
          });
        } else {
          setReviewData({ reviews: [], averageStar: 0 });
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
  
  // reviews 배열이 존재하는지 확인
  const { reviews, averageStar } = reviewData;
  if (!reviews || reviews.length === 0) return <div className='review-list-404'> 작성된 리뷰가 없습니다.</div>;

  return (
    <div className='review-list-container'>
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