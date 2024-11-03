import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// 데이터 호출 - 더미데이터, api
import { dummyPlaceDetail } from '../../data/tempPlaceDetail';

// 타입 호출
import { PlaceData } from '../../types/place';
import ReviewInput from '../../components/review/ReviewInput';
import ReviewList from '../../components/review/ReviewList';
import PlaceInfo from '../../components/place/PlaceInfo';

//스타일 호출

import '../../styles/place/PlaceDetailPage.scss';

const PlaceDetailPage = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const [ placeData, setPlaceData] = useState<PlaceData>();
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    if (!placeId) return;
    
    console.log('현재 접근한 장소 ID:', placeId);
    setIsLoading(true);
    
    try {
      setPlaceData(dummyPlaceDetail);
    } catch (error) {
      console.error('Error fetching place data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [placeId]);

  if (!placeId) {
    return <div>낫 타당한 접근방법! </div>;
  }

  if (isLoading) {
    return <div>로딩중이여요!</div>;
  }

  if (!placeData) {
    return <div>데이터가 없습니다 ㅠ</div>;
  }

  return (
    <div className="place-detail-page">
      <PlaceInfo
        data={placeData}
      />
      <ReviewInput
        placeId={placeId}
      />
      <ReviewList 
        placeId={placeId}
      />
    </div>
  );
};

export default PlaceDetailPage;