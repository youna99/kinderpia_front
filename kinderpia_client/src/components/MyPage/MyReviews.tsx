import React, { useEffect, useState, useCallback } from 'react';
import '../../styles/mypage/MyReviews.scss';
import Review from '../review/Review';
import { useNavigate } from 'react-router-dom';
import { getPlace } from '../../api/placelist';
import { requestHeader } from '../../api/requestHeader';
import { MyInfoProps, ReviewProps } from '../../types/user';
import UpBtn from '../common/UpBtn';

const MyReviews: React.FC<MyInfoProps> = ({ userInfo }) => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [hasMore, setHasMore] = useState(true); // 더 많은 데이터가 있는지 여부
  const [noReviews, setNoReviews] = useState(false); // 리뷰가 없는지 여부
  const navigate = useNavigate();

  const getUserReviewList = useCallback(
    async (pageNumber: number) => {
      if (userInfo && hasMore) {
        try {
          const response = await requestHeader.get(
            `/api/user/review/list?page=${pageNumber}&size=10`
          );
          console.log('사용자리뷰목록', response);
          if (response.data.status === 200) {
            const newReviews: ReviewProps[] = response.data.data.dataList;
            const totalPages = response.data.data.pageInfo.totalPages; // totalPages 가져오기

            if (newReviews.length === 0 && pageNumber === 1) {
              setNoReviews(true);
            } else {
              setReviews((prevReviews) => {
                const existingReviewIds = new Set(
                  prevReviews.map((review) => review.reviewId)
                );
                const filteredNewReviews = newReviews.filter(
                  (review: ReviewProps) =>
                    !existingReviewIds.has(review.reviewId)
                );
                return [...prevReviews, ...filteredNewReviews];
              });
            }

            // 현재 페이지가 totalPages에 도달했는지 확인
            if (pageNumber >= totalPages) {
              setHasMore(false); // 더 이상 불러올 데이터가 없다고 설정
            }
          } else {
            setNoReviews(true);
          }
        } catch (error) {
          console.error('리뷰 목록 가져오기 실패:', error);
        }
      }
    },
    [userInfo, hasMore]
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
      navigate(`/place/${placeData.data.placeId}`, { state: { placeData } });
    } catch (error) {
      console.error(
        `장소 정보를 가져오는 데 실패했습니다. PlaceId: ${placeId}`
      );
    }
  };

  const handleDeleteReview = (reviewId: number) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.reviewId !== reviewId)
    );
  };

  return (
    <section id="my-reviews">
      <h2>내가 쓴 리뷰</h2>
      {noReviews ? (
        <p className="no-reviews">아직 리뷰가 없습니다.</p> // 메시지 변경
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
              onReviewClick={() => handleReviewClick(review.placeId)}
              onDelete={handleDeleteReview}
            />
          ))}
        </ul>
      )}
      {!hasMore && !noReviews && (
        <p className="has-more">더 이상 리뷰가 없습니다.</p>
      )}
      <UpBtn />
    </section>
  );
};

export default MyReviews;
