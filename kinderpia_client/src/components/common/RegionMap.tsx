import React, { useState } from 'react';
import Joyride, { Step } from 'react-joyride';

import KoreaMap from '../../assets/KoreaMap';
import SeoulMap from '../../assets/SeoulMap';

import '../../styles/common/RegionMap.scss';

interface RegionMapProps {
  onDistrictClick?: (district: string) => void;
  selectedDistrict?: string | null;
}

const RegionMap: React.FC<RegionMapProps> = ({
  onDistrictClick,
  selectedDistrict,
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);
  const [mapToggle, setMapToggle] = useState(true);
  const [run, setRun] = useState(false); // Joyride 상태 관리

  const steps: Step[] = [
    {
      target: '#help-info',
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p className="joyride-content-title">
            해당 페이지의 <span className="accent">사용법</span>을 소개합니다.
          </p>
          <p>
            건너뛰시려면 왼쪽 하단의
            <br />"<span className="accent">Skip</span>"을 눌러주세요!
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.tutorial-map-container',
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p>지도의 구역을 클릭해보세요! </p>
          <p>
            해당하는 지역에 속한 데이터를
            <br /> 검색할 수 있어요
          </p>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '.tutorial-search',
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p>키워드로 검색해보세요! </p>
          <p>
            이름이나 지역에 키워드가 포함되어있는
            <br /> 검색결과를 보여줄거에요
          </p>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '.tutorial-list',
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p>검색 결과입니다! </p>
          <p>
            이전의 두가지 방법중 하나를 선택한
            <br />
            검색 결과입니다.
          </p>
        </div>
      ),
      spotlightClicks: true,
    },
  ];

  return (
    <div className="region-map">
      <Joyride
        steps={steps}
        run={run}
        continuous={true}
        showSkipButton={true}
        styles={{
          options: {
            backgroundColor: '#fff', // 배경색
            primaryColor: '#59a4d6', // 주요 색상
            textColor: '#333', // 텍스트 색상
            arrowColor: '#fff', // 화살표 색상
            width: '300px', // 너비 조정
          },
        }}
        callback={(data) => {
          const { status } = data;
          if (status === 'finished' || status === 'skipped') {
            setRun(false);
          }
        }}
      />
      <div className="map-toggle">
        <span className="tooltip-animation">도움말</span>
        <button
          type="button"
          id="help-info"
          title="도움말"
          onClick={() => setRun(true)} // 버튼 클릭 시 튜토리얼 시작
        >
          <i className="xi-info-o help-info-icon"></i>
        </button>
        <section className="map-btn-group">
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
        </section>
      </div>
      <hr />
      {mapToggle ? (
        <KoreaMap
          onRegionClick={onDistrictClick}
          selectedRegion={selectedDistrict}
          setMapToggle={setMapToggle} // 추가
        />
      ) : (
        <SeoulMap
          onDistrictClick={onDistrictClick}
          selectedDistrict={selectedDistrict}
        />
      )}
    </div>
  );
};

export default RegionMap;
