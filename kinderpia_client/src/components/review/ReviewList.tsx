import React, { useEffect, useState } from 'react'
import { ReviewData, ReviewResponse } from '../../types/reiew';
import { getReviewList } from '../../api/review';
import '../../styles/review/ReviewList.scss';
import ReviewItem from './ReviewItem'

interface ReviewListProps {
  placeId: string;
}

// ReviewList.tsx
const ReviewList: React.FC<ReviewListProps> = ({ placeId }) => {
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
        
        // 서버 응답을 ReviewItem이 기대하는 형식으로 변환
        if (Array.isArray(response.data)) {
          const formattedReviews = response.data.map(review => ({
            review: {
              reviewId: review.reviewId,
              star: review.star,
              reviewContent: review.reviewContent,
              createdAt: review.createdAt,
              updatedAt: review.updatedAt,
              deleted: review.deleted
            },
            nickname: "작성자",
            profileImg: "",
            likeCount: 0, 
            blacklist: false
          }));
          setReviews(formattedReviews);
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
      {reviews.map((review) => (
        <ReviewItem
          key={review.review.reviewId}
          data={review}
        />
      ))}
    </div>
  );
};

export default ReviewList;