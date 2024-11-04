import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import '../../styles/mypage/MyReviews.scss';
import Review from '../review/Review';
import { useNavigate } from 'react-router-dom';
import { getPlace } from '../../api/placelist';

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
  const [noReviews, setNoReviews] = useState(false); // 리뷰가 없는지 여부
  const navigate = useNavigate();

  const getUserReviewList = useCallback(
    async (pageNumber: number) => {
      if (userId && hasMore) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/user/review/list/${userId}?page=${pageNumber}&size=10`,
            { withCredentials: true }
          );
          console.log(response);
          if (response.data.status === 200) {
            const newReviews = response.data.data.dataList;
            if (newReviews.length === 0 && pageNumber === 1) {
              setNoReviews(true); // 첫 페이지에서 리뷰가 없으면 상태 업데이트
            }
            setReviews((prevReviews) => [...prevReviews, ...newReviews]);
            setHasMore(newReviews.length > 0); // 새로운 데이터가 없으면 더 이상 불러오지 않음
          } else {
            setNoReviews(true); // 다른 상태 코드일 경우에도 리뷰가 없다고 처리
          }
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

  const handleReviewClick = async (placeId: number) => {
    try {
      const placeData = await getPlace(placeId); // 장소 데이터 가져오기
      navigate(`/place/${placeId}`, { state: { placeData } }); // 장소 데이터와 함께 이동
    } catch (error) {
      console.error(
        `장소 정보를 가져오는 데 실패했습니다. PlaceId: ${placeId}`
      );
      // 추가적인 에러 처리 로직을 여기에 추가할 수 있습니다.
    }
  };

  return (
    <section id="my-reviews">
      <h2>내가 쓴 리뷰</h2>
      {noReviews ? (
        <p className="no-reviews">작성한 리뷰가 없습니다.</p> // 리뷰가 없을 때 메시지 표시
      ) : (
        <ul>
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
              onClick={() => handleReviewClick(review.placeId)}
            />
          ))}
        </ul>
      )}
      {!hasMore && !noReviews && (
        <p className="has-more">더 이상 리뷰가 없습니다.</p>
      )}{' '}
      {/* 더 이상 리뷰가 없을 때 메시지 표시 */}
    </section>
  );
};

export default MyReviews;
