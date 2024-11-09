import React, { useState } from 'react';

import '../styles/common/KoreaMap.scss';

interface KoreaMapProps {
  onRegionClick?: (region: string) => void;
  selectedRegion?: string | null;
  setMapToggle?: (value: boolean) => void; // 추가
}

const KoreaMap: React.FC<KoreaMapProps> = ({
  onRegionClick,
  selectedRegion,
  setMapToggle
}) => {
  
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const handleRegionClick = (regionName: string) => {
    if (regionName === '서울') {
      setMapToggle?.(false); // 서울 클릭 시 지도 전환
    }
    onRegionClick?.(regionName);
  };

  const handleRegionHover = (regionName: string | null) => {
    setHoveredRegion(regionName);
  };

  const getRegionColor = (regionName: string): string => {
    if (selectedRegion === regionName) {
      return '#59a4d6'; // 선택된 지역 색상
    }
    if (hoveredRegion === regionName) {
      return '#85bce4'; // 호버 시 색상
    }
    return '#b7ddf6'; // 기본 색상
  };

  return (
    <svg
      width="500"
      height="450"
      viewBox="0 0 132.29166 119.0625"
      version="1.1"
      className="w-full h-auto"
    >
      <g transform="matrix(1.1191658,0,0,1.0844962,-19.174326,-7.7589617)">
        {/* 강원도 */}
        <path
          d="M 102.59775,8.7866972 100.14916,34.860487 71.603516,33.759574 60.990729,9.8316367 Z"
          style={{
            fill: getRegionColor('강원특별자치도'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onRegionClick?.('강원특별자치도')}
          onMouseEnter={() => handleRegionHover('강원특별자치도')}
          onMouseLeave={() => handleRegionHover(null)}
        />
        {/* 경기도 */}
        <path
          d="m 58.949742,10.377455 -22.756065,3.730178 1.191248,4.840442 5.441686,-0.746344 3.979759,14.921099 -5.666963,1.080579 1.279023,5.197038 26.531735,-5.276838 z m 0,8.279176 4.489985,11.00896 -12.245415,1.000779 -3.1634,-11.09994 z"
          style={{
            fill: getRegionColor('경기도'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onRegionClick?.('경기도')}
          onMouseEnter={() => handleRegionHover('경기도')}
          onMouseLeave={() => handleRegionHover(null)}
        />
        {/* 서울 */}
        <path
          d="M 48.917714,19.97641 51.623618,30.205374 62.735863,29.336877 58.62289,19.011413 Z"
          style={{
            fill: getRegionColor('서울'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => handleRegionClick('서울')} // onClick 수정
          onMouseEnter={() => handleRegionHover('서울')}
          onMouseLeave={() => handleRegionHover(null)}
        />
        {/* 인천 */}
        <path
          d="m 42.423544,18.818414 3.571795,13.895951 -13.565597,2.348158 1.010204,-14.860947 z"
          style={{
            fill: getRegionColor('인천광역시'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onRegionClick?.('인천광역시')}
          onMouseEnter={() => handleRegionHover('인천광역시')}
          onMouseLeave={() => handleRegionHover(null)}
        />
        {/* 충청남도 */}
        <path
          d="m 54.762432,39.019179 -24.533639,4.728259 4.654296,17.981264 30.233897,-2.090997 -1.543217,-3.072886 -7.945251,0.982274 -4.906814,-12.770348 6.365281,-1.128768 z"
          style={{
            fill: getRegionColor('충청남도'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onRegionClick?.('충청남도')}
          onMouseEnter={() => handleRegionHover('충청남도')}
          onMouseLeave={() => handleRegionHover(null)}
        />
        {/* 충청북도 */}
        <path
          d="m 71.033874,35.705735 -14.79222,3.023927 2.241101,4.698576 6.273614,-1.064004 4.762507,13.477832 -4.852013,0.552358 1.424308,2.986147 7.901147,-1.12607 -4.473555,-16.4693 13.2049,0.482656 5.411416,-5.693571 z"
          style={{
            fill: getRegionColor('충청북도'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onRegionClick?.('충청북도')}
          onMouseEnter={() => handleRegionHover('충청북도')}
          onMouseLeave={() => handleRegionHover(null)}
        />
        {/* 세종 */}
        <path
          d="m 51.443223,45.098487 2.291,5.74173 12.483236,-1.929993 -2.146683,-5.999062 z"
          style={{
            fill: getRegionColor('세종특별자치시'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onRegionClick?.('세종특별자치시')}
          onMouseEnter={() => handleRegionHover('세종특별자치시')}
          onMouseLeave={() => handleRegionHover(null)}
        />
        {/* 대전 */}
        <path
          d="m 53.914617,51.210133 2.074526,6.015144 12.735788,-1.543993 -2.327077,-6.288562 z"
          style={{
            fill: getRegionColor('대전광역시'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onRegionClick?.('대전광역시')}
          onMouseEnter={() => handleRegionHover('대전광역시')}
          onMouseLeave={() => handleRegionHover(null)}
        />
        {/* 전라북도 */}
        <path
          d="M 68.031906,60.416933 64.154157,76.975429 34.968996,77.157392 38.846745,62.327529 Z"
          style={{
            fill: getRegionColor('전라북도'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onRegionClick?.('전라북도')}
          onMouseEnter={() => handleRegionHover('전라북도')}
          onMouseLeave={() => handleRegionHover(null)}
        />
        {/* 대구 */}
        <path
          d="m 81.808118,61.599683 9.898463,-0.727846 1.71108,10.676915 -10.632412,-1.687324 z"
          style={{
            fill: getRegionColor('대구광역시'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onRegionClick?.('대구광역시')}
          onMouseEnter={() => handleRegionHover('대구광역시')}
          onMouseLeave={() => handleRegionHover(null)}
        />
        {/* 경상남도 */}
        <path
          d="m 67.26642,66.648945 -2.755219,12.146211 6.428843,9.507405 19.286964,-0.727839 3.035824,-1.965699 -0.127552,-4.835046 7.34727,-4.776492 -0.10206,-2.73476 -17.602786,-2.246357 -11.123352,-4.321934 z"
          style={{
            fill: getRegionColor('경상남도'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onRegionClick?.('경상남도')}
          onMouseEnter={() => handleRegionHover('경상남도')}
          onMouseLeave={() => handleRegionHover(null)}
        />
        {/* 전라남도 */}
        <path
          d="m 62.674388,77.748886 -27.603207,0.500389 -5.15328,16.285411 4.132828,6.914484 35.460684,-12.964651 z M 38.540715,79.432013 H 52.16374 v 5.64076 H 38.540715 Z"
          style={{
            fill: getRegionColor('전라남도'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onRegionClick?.('전라남도')}
          onMouseEnter={() => handleRegionHover('전라남도')}
          onMouseLeave={() => handleRegionHover(null)}
        />
        {/* 광주 */}
        <path
          d="m 39.212539,79.870529 -0.07216,4.696319 12.591476,0.0965 v -4.921486 z"
          style={{
            fill: getRegionColor('광주광역시'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onRegionClick?.('광주광역시')}
          onMouseEnter={() => handleRegionHover('광주광역시')}
          onMouseLeave={() => handleRegionHover(null)}
        />
        {/* 제주도 */}
        <path
          d="m 28.336003,108.45476 -0.306137,8.00631 18.266238,-0.81883 -0.51023,-8.0063 z"
          style={{
            fill: getRegionColor('제주특별자치도'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onRegionClick?.('제주특별자치도')}
          onMouseEnter={() => handleRegionHover('제주특별자치도')}
          onMouseLeave={() => handleRegionHover(null)}
        />
        {/* 울산 */}
        <path
          d="m 100.91624,68.104807 0.33165,7.642382 6.6585,1.546674 3.44405,-9.552979 z"
          style={{
            fill: getRegionColor('울산광역시'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onRegionClick?.('울산광역시')}
          onMouseEnter={() => handleRegionHover('울산광역시')}
          onMouseLeave={() => handleRegionHover(null)}
        />
        {/* 부산 */}
        <path
          d="m 101.14585,76.520526 -7.398348,4.844726 0.02552,4.617273 13.980308,-8.211013 z"
          style={{
            fill: getRegionColor('부산광역시'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onRegionClick?.('부산광역시')}
          onMouseEnter={() => handleRegionHover('부산광역시')}
          onMouseLeave={() => handleRegionHover(null)}
        />
        {/* 경상북도 */}
        <g
          style={{
            fill: getRegionColor('경상북도'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onRegionClick?.('경상북도')}
          onMouseEnter={() => handleRegionHover('경상북도')}
          onMouseLeave={() => handleRegionHover(null)}
          transform="matrix(0.83673468,0,0,0.74600409,1.2938096,2.7351382)"
        >
          <path d="m 106.93404,45.705737 -7.5029,9.744625 -15.177885,-0.77618 5.174361,21.300509 -6.898693,1.20749 -1.207472,6.597022 15.177724,5.923768 -1.379791,-12.003336 14.315046,-0.948607 2.06969,15.842693 6.72691,1.007801 -0.34495,-6.933224 11.70601,-0.431185 -10.24029,-38.979392 z" />
          <rect width="9.2687654" height="5.6100426" x="141.5316" y="42.014339" />
          <rect width="1.9513191" height="1.097617" x="152.81267" y="48.965916" />
        </g>

        {/* 지역 이름 표시 */}
        {(hoveredRegion || selectedRegion) && (
          <text
            x="20"
            y="20"
            fill="black"
            fontSize="14"
            className="district-name"
          >
            {hoveredRegion || selectedRegion}
          </text>
        )}
      </g>
    </svg>
  );
};

export default KoreaMap;