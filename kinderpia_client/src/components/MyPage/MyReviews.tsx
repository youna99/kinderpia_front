import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import '../../styles/mypage/MyReviews.scss';
import Review from '../review/Review';

interface ReviewProps {
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
    profileImg?: string;
    nickname?: string;
  } | null;
}

const MyReviews: React.FC<MyInfoProps> = ({ userId, userInfo }) => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [hasMore, setHasMore] = useState(true); // 더 많은 데이터가 있는지 여부

  const getUserReviewList = useCallback(
    async (pageNumber: number) => {
      if (userId && hasMore) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/user/review/list/${userId}?page=${pageNumber}&size=10`,
            { withCredentials: true }
          );
          const newReviews = response.data.data.dataList;

          setReviews((prevReviews) => [...prevReviews, ...newReviews]);
          setHasMore(newReviews.length > 0); // 새로운 데이터가 없으면 더 이상 불러오지 않음
        } catch (error) {
          console.error('리뷰 목록 가져오기 실패:', error);
        }
      }
    },
    [userId, hasMore]
  );

  useEffect(() => {
    getUserReviewList(page);
  }, [page, getUserReviewList]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 500
    ) {
      setPage((prevPage) => prevPage + 1); // 스크롤이 바닥에 가까워지면 페이지 증가
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
          profileImg={userInfo?.profileImg || '/images/usericon.png'}
          nickname={userInfo?.nickname}
        />
      ))}
      {!hasMore && <p>더 이상 리뷰가 없습니다.</p>}
    </section>
  );
};

export default MyReviews;
