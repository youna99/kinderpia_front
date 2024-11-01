import { useEffect, useState } from "react";
import React from 'react'

// 스타일 호출
import '../../styles/meeting/createpage/StaticMapView.scss'

// api 호출

import { getCoordinate } from "../../api/map";

interface MapViewProps {
  location?: string;
}

const StaticMapView: React.FC<MapViewProps> = ({
  location = '',
}) => {
  const [src, setSrc] = useState('');
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number}>({
    lat: 37.2874971,  // 초기값 수정 (위도)
    lng: 127.0602549  // 초기값 수정 (경도)
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (!location) return;
      
      setIsLoading(true);
      try {
        const result = await getCoordinate(location);
        if (result.coordinates) {
          setCoordinates(result.coordinates);
          setSrc(`https://simg.pstatic.net/static.map/v2/map/staticmap.bin?crs=EPSG:4326&baselayer=bl_vc_bg&overlayers=ol_vc_an&scale=2&caller=mw_smart_booking&overlayers=ol_vc_an&center=${result.coordinates.lng},${result.coordinates.lat}&markers=color:0x59A4D6|type:c|size:mid|label:a|pos:${result.coordinates.lng} ${result.coordinates.lat}&level=14&w=335&h=170&lang=ko`);
        }
        console.log(result);
        
      } catch (error) {
        console.error('좌표 가져오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoordinates();
  }, [location]);

  if (isLoading) {
    return <div>지도를 불러오는 중...</div>;
  }

  return (
    <div>
      <img 
        className="map" 
        src={src} 
        width="100%" 
        height="100%" 
        alt="map"
      />
    </div>
  );
}

export default StaticMapView;