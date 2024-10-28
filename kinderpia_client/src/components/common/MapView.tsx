import { useEffect } from "react";
import React from 'react'
interface MapViewProps {
  latitute: number;
  longitute: number;
}

const MapView:React.FC<MapViewProps> = ({
  latitute, 
  longitute,
}) => {
  useEffect(() => {
  }, []);
  return ( // 지도는 임시지도입니다!
    <img 
      className="map" 
      src="https://simg.pstatic.net/static.map/v2/map/staticmap.bin?crs=EPSG:4326&baselayer=bl_vc_bg&overlayers=ol_vc_an&scale=2&caller=mw_smart_booking&overlayers=ol_vc_an&center=127.0602549,37.2874971&markers=type:c|size:mid|label:cafe|pos:127.0602549 37.2874971&level=16&w=335&h=170&lang=ko" 
      width="100%" 
      height="100%" 
      alt="map"
    />
  );
}

export default MapView;