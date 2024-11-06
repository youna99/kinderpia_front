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
  onDelete,
  reviewdelete,
}) => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();

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
      console.log('reviewData >>>', reviewData);

      if (reviewData.reviews.length > 0) {
        setReviews((prevReviews) => [...prevReviews, ...reviewData.reviews]);
        setHasMore(reviewData.reviews.length > 0);
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

  useEffect(() => {
    setPage(0);
    setReviews([]);
    setHasMore(true);
  }, [placeId, reviewcreate, reviewdelete]);

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
  if (reviews.length === 0)
    return <div className="review-list-404">작성된 리뷰가 없습니다.</div>;

  const currentUserId = extractUserIdFromCookie();

  return (
    <div className="review-list-container">
      <hr />
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
