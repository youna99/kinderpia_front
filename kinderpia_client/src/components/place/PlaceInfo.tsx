import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlaceData, ratingAndCategory } from '../../types/place';
import StaticMapView from '../common/StaticMapView';

// 스타일 호출
import '../../styles/place/PlaceInfo.scss';

interface PlaceInfoProps {
  data: PlaceData;
  ratingAndCategory: ratingAndCategory;
}

const PlaceInfo: React.FC<PlaceInfoProps> = ({ data, ratingAndCategory }) => {
  const navigate = useNavigate();

  const btnSendYouThere = () => {
    navigate('/meeting/create');
  };

  return (
    <div className="place-info-container">
      <div className="place-info-top">
        <div className="place-info-coverImage"></div>
        <span className="place-info-category">
          {ratingAndCategory.placeCtgName}
        </span>
        <div className="place-info-wrapper">
          <div className="place-info-wrapper-title">{data.placeName}</div>
          <div className="place-info-wrapper-star">
            <i className="xi-star"></i> {ratingAndCategory.averageStar}
          </div>
          <div
            className="place-info-wrapper-btn"
            onClick={() => {
              btnSendYouThere();
            }}
          >
            모임 생성하기
          </div>
        </div>
      </div>
      <div className="place-info-details">
        <div className="place-info-details-title">
          자세한 정보를 알려드릴게요!
        </div>
        <hr />
        <div className="place-info-details-content">
          <span>운영 시간 : {data.operatingDate}</span>
          <span>요금 정보 : {data.paid}</span>
          <span>전화 번호 : {data.placeNum}</span>
          <span>홈페이지 주소 : {data.homepageUrl}</span>
        </div>
      </div>
      <div className="place-info-map">
        <div className="place-info-map-title">지도</div>
        <hr />
        <StaticMapView location={data.location} />
      </div>
    </div>
  );
};

export default PlaceInfo;
