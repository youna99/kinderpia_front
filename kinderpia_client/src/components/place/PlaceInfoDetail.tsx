import React from 'react';
import { PlaceData } from '../../types/place';
import { getIcon } from '../../utils/getIcon';
import '../../styles/place/PlaceInfoDetail.scss';
import { Link, useNavigate } from 'react-router-dom';
import StaticMapView from '../common/StaticMapView';

const PlaceInfoDetail: React.FC<PlaceData> = ({
  //   placeId,
  placeName,
  placeCategoryName,
  location,
  detailAddress,
  //   latitude,
  //   longitude,
  //   placeImg,
  //   rating,
  paid,
  operatingDate,
  homepageUrl,
  placeNum,
}) => {
  const navigate = useNavigate();

  // 카테고리별 아이콘이미지 가져오기
  const categoryIconImg = placeCategoryName ? getIcon(placeCategoryName) : null;

  // 모임 생성하기
  const handleMeetingCreate = () => {
    const path = `/meeting/create?category=${encodeURIComponent(
      placeCategoryName
    )}&name=${encodeURIComponent(location)}`;
    navigate(path);
  };

  return (
    <>
      <section className="placeInfo-container">
        <div className="place-info-detail-coverImage">{categoryIconImg}</div>
        <span className="place-info-detail-category">{placeCategoryName}</span>
        <div className="place-info-detail-wrapper">
          <div className="place-info-detail-wrapper-title">{placeName}</div>
          <div className="place-info-detail-wrapper-ratingButton">
            <div className="rating">
              {/* <span className="star">⭐</span> {rating} */}
              <span className="star">⭐</span> 5.0
            </div>
            <button type="button" onClick={handleMeetingCreate}>
              모임 만들기
            </button>
          </div>
        </div>
      </section>
      <section className="placeInfo-detail-container">
        <div className="place-header">자세한 정보를 알려드릴게요!</div>
        <hr />
        <div className="place-text">
          <p>운영 일자: {operatingDate}</p>
          <p>요금 정보: {paid ? '유료' : '무료'}</p>
          <p>전화번호: {placeNum}</p>
          <Link to={homepageUrl}>
            <p className="url">홈페이지로 이동하기 (click!)</p>
          </Link>
        </div>
      </section>
      <section className='placeInfo-map'>
        <div className='placeInfo-map-title'>
          지도
        </div>
        <hr/>
        <StaticMapView
          location={detailAddress}
        />
      </section>
    </>
  );
};

export default PlaceInfoDetail;
