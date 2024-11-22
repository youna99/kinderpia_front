import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ReviewData } from '../../types/review';
import { getReviewList } from '../../api/review';
import '../../styles/review/ReviewList.scss';
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
  reviewdelete,
  onDelete,
}) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();
  const isInitialMount = useRef(true);
  const [totalReview, setTotalReview] = useState<number>();

  const fetchReviews = useCallback(async () => {
    if (!hasMore) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await getReviewList({
        placeId: Number(placeId),
        page: page,
        size: 4,
      });
      const reviewData = response.data;
      setTotalReview(reviewData.totalReviewCount);

      if (reviewData.reviews.length > 0) {
        setReviews((prevReviews) => {
          // 페이지가 0이면 새로운 데이터로 교체, 아니면 추가
          return page === 0
            ? reviewData.reviews
            : [...prevReviews, ...reviewData.reviews];
        });
        setHasMore(reviewData.reviews.length === 4); // size가 4이므로 4개가 아니면 마지막 페이지
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '리뷰를 불러오는데 실패했습니다.'
      );
      console.error('리뷰 로딩 에러:', err);
    } finally {
      setIsLoading(false);
    }
  }, [page, placeId, hasMore]);

  // 초기화 처리를 위한 useEffect
  useEffect(() => {
    if (!isInitialMount.current) {
      // 초기 마운트가 아닐 때만 실행
      setPage(0);
      setHasMore(true);
      // reviews는 fetchReviews에서 초기화될 것이므로 여기서는 초기화하지 않음
    } else {
      isInitialMount.current = false;
    }
  }, [placeId, reviewcreate, reviewdelete]);

  // 데이터 fetch를 위한 useEffect
  useEffect(() => {
    fetchReviews();
  }, [page, fetchReviews]);

  const lastReviewElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  if (isLoading && reviews.length === 0) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (reviews.length === 0)
    return <div className="review-list-404">작성된 리뷰가 없습니다.</div>;

  const currentUserId = extractUserIdFromCookie();

  return (
    <div className="review-list-container">
      <hr />
      <div className="totalReview">리뷰 {totalReview}</div>
      {reviews.map((reviewData, index) => (
        <div
          className="review-item"
          key={reviewData.review.reviewId}
          ref={index === reviews.length - 1 ? lastReviewElementRef : null}
        >
          <Review
            reviewId={reviewData.review.reviewId}
            reviewContent={reviewData.review.reviewContent}
            star={reviewData.review.star}
            createdAt={reviewData.review.createdAt}
            likeCount={reviewData.likeCount}
            profileImg={reviewData.profileImg || '/images/usericon.png'}
            nickname={reviewData.nickname}
            showPlaceName={false}
            isOwner={currentUserId === String(reviewData.writer)}
            onDelete={onDelete}
            likedByUser={reviewData.likedByUser}
          />
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
