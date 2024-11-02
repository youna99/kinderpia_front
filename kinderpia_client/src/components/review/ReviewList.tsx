import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

// 데이터 호출
import { dummyReviews } from '../../data/tempReviewList'

// 컴포넌트 호출
import ReviewItem from './ReviewItem'

// 타입 호출
import { ReviewData } from '../../types/place';

// 스타일 호출
import '../../styles/review/ReviewList.scss';

const ReviewList = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const [ reviews, setReviews ] = useState<ReviewData[]>([]);
  
  useEffect(() => {
    setReviews(dummyReviews); 
  }, []);

  return (
    <div className='review-list-container'>
      {reviews.map((review) => (
        <ReviewItem
          key={review.id}
          data={review}  // 전체 데이터를 한 번에 전달
        />
      ))}
    </div>
  )
}

export default ReviewList