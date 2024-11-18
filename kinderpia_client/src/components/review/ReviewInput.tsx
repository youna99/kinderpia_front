import React, { useState, useEffect } from 'react';
import CommonButton1 from '../common/CommonButton1';

import '../../styles/review/ReviewInput.scss';
import { simpleAlert } from '../../utils/alert';
import { postReview } from '../../api/review';
import { extractUserIdFromCookie } from '../../utils/extractUserIdFromCookie';
import { AxiosError } from 'axios';

interface ReviewInputProps {
  placeId: string;
  onReviewSubmit: () => void;
}

const ReviewInput: React.FC<ReviewInputProps> = ({
  placeId,
  onReviewSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [star, setStar] = useState<number>(0);
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState(0);
  const [pagePlaceId, setPagePlaceId] = useState(0);

  // 별점 렌더링을 위한 배열
  const stars = [1, 2, 3, 4, 5];

  useEffect(() => {
    setIsLoading(false);
    setPagePlaceId(Number(placeId));
    const tempSpace = Number(extractUserIdFromCookie()) || 0;
    setUserId(tempSpace);
  }, [placeId]);

  // 별점 선택 핸들러
  const handleStarClick = (rating: number) => {
    setStar(rating);
  };

  // 리뷰 내용 변경 핸들러
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 리뷰 제출 핸들러
  const handleSubmit = async () => {
    if (userId === 0) {
      simpleAlert('warning', '로그인 해주세요!', 'center');
      return;
    }

    if (star === 0) {
      simpleAlert('warning', '별점을 입력해주세요!', 'center');
      return;
    }

    if (!content.trim()) {
      simpleAlert('warning', '리뷰 내용을 입력해주세요!', 'center');
      return;
    }

    setIsSubmitting(true);
    try {
      const reviewData = {
        placeId: pagePlaceId,
        star,
        reviewContent: content.trim(),
      };

      const result = await postReview(reviewData);

      console.log('result>>>', result);
      onReviewSubmit();
      setStar(0);
      setContent('');
      simpleAlert('success', '리뷰가 등록되었습니다.');
    } catch (error) {
      const axiosError = error as AxiosError; // AxiosError로 타입 단언
      if (axiosError.response) {
        if (axiosError.response.status === 409) {
          simpleAlert('error', '해당 장소에 대한 리뷰는 이미 작성하였습니다.');
        } else {
          console.error('다른 오류 발생:', error);
        }
      } else {
        console.error('Axios가 아닌 다른 오류 발생:', error);
      }
      setStar(0);
      setContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!placeId) {
    return <div>No data available</div>;
  }

  return (
    <div className="review-input-container">
      <div className="review-input-header">
        <div className="review-input-header-title">리뷰</div>
      </div>
      <hr />
      <div className="review-input-subtitle">
        별점을 눌러 만족도를 알려주세요 :D
      </div>
      <div className="review-input-star">
        {stars.map((rating) => (
          <button
            key={rating}
            onClick={() => handleStarClick(rating)}
            aria-label={`${rating}점`}
            disabled={isSubmitting}
          >
            {rating <= star ? (
              <i className="xi-star"></i>
            ) : (
              <i className="xi-star-o"></i>
            )}
          </button>
        ))}
      </div>

      <div className="review-input-content">
        <textarea
          placeholder="이 장소를 다녀온 후 느낀점을 남겨주세요."
          value={content}
          onChange={handleContentChange}
          disabled={isSubmitting}
          maxLength={500}
        />
        <div className="review-inpu-content-length">{content.length} / 500</div>
        <CommonButton1
          text="리뷰 작성하기"
          onClick={handleSubmit}
          disabled={isSubmitting}
        />
      </div>
    </div>
  );
};

export default ReviewInput;
