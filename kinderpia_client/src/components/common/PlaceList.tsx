import React from 'react';
import { PlaceListInfo } from '../../types/placelist';

const PlaceList: React.FC<PlaceListInfo> = ({
  title,
  category,
  rating,
  priceType,
}) => {
  return (
    <section>
      <div className="place-container">
        <div className="place-image">
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
