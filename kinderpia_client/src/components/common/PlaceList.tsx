import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlaceListInfo } from '../../types/placelist';
import '../../styles/PlaceList.scss';

const PlaceList: React.FC<PlaceListInfo> = ({
  placeid,
  title,
  category,
  rating,
  priceType,
  image,
}) => {
  const navigate = useNavigate();
  
  const buttonCanSendYouThere = ( id : number)=>{
    navigate(`/place/${id}`);
  };
  return (
    <section
      onClick={()=>{buttonCanSendYouThere(placeid)}}
    >
      <div className="place-container">
        <div className="place-image">
          <img src={image} alt={title} />
          <span className="place-category">{category}</span>
        </div>
        <div className="place-content">
          <h3 className="title">{title}</h3>
          <div className="rating">
            <span className="star">⭐</span> {rating}
          </div>
          <p className="price-type">{priceType}</p>
        </div>
      </div>
    </section>
  );
};

export default PlaceList;
