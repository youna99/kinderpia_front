import React, { useState, useEffect } from 'react'

interface ReviewInputProps {
  placeId: string;
}

const ReviewInput: React.FC<ReviewInputProps> = ({
  placeId
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [star, setStar] = useState<number>(0);
  const [content, setContent] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 별점 렌더링을 위한 배열
  const stars = [1, 2, 3, 4, 5];

  useEffect(() => {
    setIsLoading(false);
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
    if (star === 0) {
      alert('별점을 선택해주세요.');
      return;
    }

    if (!content.trim()) {
      alert('리뷰 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const reviewData = {
        placeId,
        star,
        content: content.trim()
      };
      
      console.log('리뷰 제출:', reviewData);
      setStar(0);
      setContent('');
      alert('리뷰가 등록되었습니다.');
      
    } catch (error) {
      console.error('리뷰 등록 중 오류 발생:', error);
      alert('리뷰 등록에 실패했습니다. 다시 시도해주세요.');
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
    <div className='review-input-box'>
      <div className='review-input-title'>
        별점을 눌러 만족도를 알려주세요 :D
      </div>
      
      <div className='review-input-star'>
        {stars.map((rating) => (
          <button
            key={rating}
            onClick={() => handleStarClick(rating)}
            aria-label={`${rating}점`}
            disabled={isSubmitting}
          >
            {rating <= star ? '★' : '☆'}
          </button>
        ))}
      </div>

      <div className='review-input-content'>
        <textarea
          placeholder="이 장소를 다녀오신 후 느끼신 점을 남겨주세요."
          value={content}
          onChange={handleContentChange}
          disabled={isSubmitting}
          maxLength={500}
        />
        <div className='review-input-length'>
          {content.length} / 500
        </div>
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting || star === 0 || !content.trim()}
        >
          {isSubmitting ? '등록 중...' : '리뷰 쓰기'}
        </button>
      </div>
    </div>
  )
}

export default ReviewInput;