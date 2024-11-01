import React from 'react'
import { ReviewData } from '../../types/place';
import defaultIcon from '../../assets/images/tempIcon1.png';  // 기본 이미지 import

// 스타일 호출
import '../../styles/review/ReviewItem.scss';

interface ReviewItemProps {
  data: ReviewData;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ data }) => {
  const { writer, writerIcon, content, star, createdAt } = data;

  return (
    <div className='review-item-container'>
      <div className='review-item-header'>
        <div className='review-item-header-profile'>
          <img 
            src={defaultIcon}  // writerIcon이 없으면 기본 이미지 사용
            alt={`${writer}의 프로필`}
          />
        </div>
        <div className='review-item-header-info'>
          <div className='review-item-header-info-nickname'>
            {writer}
          </div>
          <div className='review-item-header-info-wrapper'>
            <div className='review-item-header-info-wrapper-star'>
              {star}점
            </div>
            <div className='review-item-header-info-wrapper-date'>
              {createdAt}
            </div>
            <div className='review-item-header-info-wrapper-report'>
              신고하기
            </div>
          </div>
        </div>
      </div>
      <div className='review-item-content'>
        {content}
      </div>
      <div className='review-item-action'>
        <div className='review-item-action-btn'>
          수정/삭제
        </div>
      </div>
      <hr/>
    </div>
  )
}

export default ReviewItem