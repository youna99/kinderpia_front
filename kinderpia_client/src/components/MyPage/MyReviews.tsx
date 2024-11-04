// MyReviews.tsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../styles/mypage/MyReviews.scss';
import { formatDate } from '../../utils/formatDate';
import Review from '../review/Review';

interface Review {
  reviewId: number;
  reviewContent: string;
  star: number;
  createdAt: string;
  likeCount: number;
  placeId: number;
  placeName: string;
}

interface MyInfoProps {
  userId: string | null;
  userInfo: {
    profileImg?: string; // 프로필 이미지가 선택적임을 나타냄
    nickname?: string; // 닉네임이 선택적임을 나타냄
  } | null; // userInfo가 null일 수 있음을 명시
}

const MyReviews: React.FC<MyInfoProps> = ({ userId, userInfo }) => {
  // /api/user/review/list/{userId}?page=1&size=10
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const getUserReviewList = async () => {
      if (userId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/user/review/list/${userId}?page=2&size=10`,
            { withCredentials: true }
          );
          setReviews(response.data.data.dataList);
        } catch (error) {
          console.error('리뷰 목록 가져오기 실패:', error);
        }
      }
    };
    getUserReviewList();
  }, [userId]);

  return (
    <section id="my-reviews">
      <h2>내가 쓴 리뷰</h2>
      {reviews.map((review) => (
        <Review
          key={review.reviewId}
          reviewId={review.reviewId}
          reviewContent={review.reviewContent}
          star={review.star}
          createdAt={review.createdAt}
          likeCount={review.likeCount}
          placeName={review.placeName}
          profileImg={userInfo?.profileImg}
          nickname={userInfo?.nickname}
        />
      ))}
    </section>
  );
};

export default MyReviews;
