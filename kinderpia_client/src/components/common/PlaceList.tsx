import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlaceListInfo } from '../../types/placelist';
import '../../styles/common/PlaceList.scss';
import { getIcon } from '../../utils/getIcon';

const PlaceList: React.FC<PlaceListInfo> = ({
  placeId,
  placeName,
  placeCategoryName,
  // rating,
  paid,
  placeImg,
}) => {
  const navigate = useNavigate();

  const buttonCanSendYouThere = (id: number) => {
    navigate(`/place/${id}`);
  };

  // 카테고리별 아이콘이미지 가져오기
  const categoryIconImg = placeCategoryName ? getIcon(placeCategoryName) : null;

  return (
    <section
      className="place-section"
      onClick={() => {
        buttonCanSendYouThere(placeId);
      }}
    >
      <div className="place-container">
        <div className="place-image">
          {categoryIconImg ? (
            <figure className="place-icon">{categoryIconImg}</figure>
          ) : (
            <img src={placeImg} alt={placeName} />
          )}
          <span className="place-category">{placeCategoryName}</span>
        </div>
        <div className="place-content">
          <h3 className="title">{placeName}</h3>
          <div className="rating">
            {/* <span className="star">⭐</span> {rating} */}
            <span className="star">⭐</span> 5.0
          </div>
          <p className="price-type">{paid ? '유료' : '무료'}</p>
        </div>
      </div>
    </section>
  );
};

export default PlaceList;
