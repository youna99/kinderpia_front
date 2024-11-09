import React, { useState } from 'react'
import KoreaMap from '../../assets/KoreaMap';
import SeoulMap from '../../assets/SeoulMap';

import '../../styles/common/RegionMap.scss';

interface RegionMapProps {
  onDistrictClick?: (district: string) => void;
  selectedDistrict?: string | null;
}

const RegionMap:React.FC<RegionMapProps> = ({
  onDistrictClick,
  selectedDistrict,
}) => { 
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [mapToggle, setMapToggle]=useState(true);

  return (
    <div className='region-map'>
      <div className="map-toggle">
        <button 
          className={mapToggle ? 'active' : ''}
          onClick={() => setMapToggle(true)}
        >
          전국 지도
        </button>
        <button 
          className={!mapToggle ? 'active' : ''}
          onClick={() => setMapToggle(false)}
        >
          서울 지도
        </button>
      </div>
      <hr/>
      {mapToggle
        ?
          <KoreaMap
            onRegionClick={onDistrictClick}
            selectedRegion={selectedDistrict}
            setMapToggle={setMapToggle} // 추가
          />
        :
          <SeoulMap
            onDistrictClick={onDistrictClick}
            selectedDistrict={selectedDistrict}
          />
        }
    </div>
  )
}

export default RegionMap