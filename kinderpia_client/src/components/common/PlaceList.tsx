import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlaceListInfo } from '../../types/placelist';
import '../../styles/common/PlaceList.scss';

const PlaceList: React.FC<PlaceListInfo> = ({
  placeId,
  placeName,
  category,
  // rating,
  paid,
  placeImg,
}) => {
  const navigate = useNavigate();

  const buttonCanSendYouThere = (id: number) => {
    navigate(`/place/${id}`);
  };
  return (
    <section
      className="place-section"
      onClick={() => {
        buttonCanSendYouThere(placeId);
      }}
    >
      <div className="place-container">
        <div className="place-image">
          <img src={placeImg} alt={placeName} />
          <span className="place-category">{category}</span>
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
