import { useEffect, useState } from "react";
import React from 'react'
import '../../styles/meeting/createpage/StaticMapView.scss'
interface MapViewProps {
  location?:string;
}

const StaticMapView:React.FC<MapViewProps> = ({
  location,
}) => {
  const [src , setSrc] = useState('');
  const [latitute, setLatitute] = useState(127.0602549);
  const [longitude, setLongitude] = useState(7.2874971);
  useEffect(() => {

    setSrc(`https://simg.pstatic.net/static.map/v2/map/staticmap.bin?crs=EPSG:4326&baselayer=bl_vc_bg&overlayers=ol_vc_an&scale=2&caller=mw_smart_booking&overlayers=ol_vc_an&center=${longitude},${latitute}&markers=color:0x59A4D6|type:c|size:mid|label:a|pos:${longitude} ${latitute}&level=14&w=335&h=170&lang=ko`);
  }, []);
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

export default StaticMapView;