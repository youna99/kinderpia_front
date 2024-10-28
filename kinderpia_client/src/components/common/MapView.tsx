import { useEffect, useState } from "react";
import React from 'react'
interface MapViewProps {
  latitute: number;
  longitude: number;
}

const MapView:React.FC<MapViewProps> = ({
  latitute = 127.0602549, 
  longitude = 37.2874971,
}) => {
  const [src , setSrc] = useState('');
  useEffect(() => {
    setSrc(`https://simg.pstatic.net/static.map/v2/map/staticmap.bin?crs=EPSG:4326&baselayer=bl_vc_bg&overlayers=ol_vc_an&scale=2&caller=mw_smart_booking&overlayers=ol_vc_an&center=${longitude},${latitute}&markers=color:0x59A4D6|type:c|size:mid|label:a|pos:${longitude} ${latitute}&level=14&w=335&h=170&lang=ko`);
  }, [ latitute, longitude ]);
  return ( // 지도는 임시지도입니다!
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

export default MapView;