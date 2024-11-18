import React, { useState } from 'react';

import '../styles/common/SeoulMap.scss';

interface SeoulMapProps {
  onDistrictClick?: (district: string) => void;
  selectedDistrict?: string | null;
}

const SeoulMap: React.FC<SeoulMapProps> = ({
  onDistrictClick,
  selectedDistrict,
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  const handleDistrictHover = (districtName: string | null) => {
    setHoveredDistrict(districtName);
  };

  const getDistrictColor = (districtName: string): string => {
    if (selectedDistrict === districtName) {
      return '#59a4d6'; // 선택된 구역 색상
    }
    if (hoveredDistrict === districtName) {
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
      <g>
        {/* 마포구 */}
        <path
          d="M 21.38213,50.685784 48.408,71.415857 55.778692,60.052705 23.224803,41.01175"
          style={{
            fill: getDistrictColor('마포구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('마포구')}
          onMouseEnter={() => handleDistrictHover('마포구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />
        {/* 용산구 */}
        <path
          d="M 58.389145,59.43848 49.790003,71.722962 64.224277,78.325877 77.430099,67.884065"
          style={{
            fill: getDistrictColor('용산구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('용산구')}
          onMouseEnter={() => handleDistrictHover('용산구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />
        {/* 성동구 */}
        <path
          d="M 74.051864,63.430937 93.092823,68.344731 98.774395,56.520915 81.542297,50.164136"
          style={{
            fill: getDistrictColor('성동구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('성동구')}
          onMouseEnter={() => handleDistrictHover('성동구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />
        {/* 중구 */}
        <path
          d="M 56.085803,56.674469 71.748525,63.73805 78.812104,51.760676 58.082033,51.914232"
          style={{
            fill: getDistrictColor('중구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('중구')}
          onMouseEnter={() => handleDistrictHover('중구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 서대문구 */}
        <path
          d="M 35.662844,46.0791 54.396687,57.442249 57.007141,51.300007 48.561556,34.255283"
          style={{
            fill: getDistrictColor('서대문구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('서대문구')}
          onMouseEnter={() => handleDistrictHover('서대문구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 종로구 */}
        <path
          d="M 50.557784,33.333946 58.389145,50.532226 80.13535,49.581511 64.377833,39.015521 60.538931,21.203016"
          style={{
            fill: getDistrictColor('종로구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('종로구')}
          onMouseEnter={() => handleDistrictHover('종로구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 은평구 */}
        <path
          d="M 33.513059,44.082871 59.310482,20.435234 48.715112,9.2256415 30.288383,31.644829"
          style={{
            fill: getDistrictColor('은평구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('은평구')}
          onMouseEnter={() => handleDistrictHover('은평구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 성북구 */}
        <path
          d="m 62.194229,20.956881 3.868283,17.227661 15.29463,9.764394 12.196348,-15.996995 -14.127161,3.224678"
          style={{
            fill: getDistrictColor('성북구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('성북구')}
          onMouseEnter={() => handleDistrictHover('성북구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />
        {/* 광진구 */}
        <path
          d="m 112.98699,49.457333 -0.71828,15.557337 -10.07976,5.474395 -6.792793,-1.530108 6.602923,-17.198281"
          style={{
            fill: getDistrictColor('광진구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('광진구')}
          onMouseEnter={() => handleDistrictHover('광진구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 동대문구 */}
        <path
          d="m 94.628376,33.180389 -11.60706,15.84344 16.240909,6.451573 -0.48783,-12.467422"
          style={{
            fill: getDistrictColor('동대문구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('동대문구')}
          onMouseEnter={() => handleDistrictHover('동대문구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 중랑구 */}
        <path
          d="m 100.90146,50.744542 -0.46067,-7.79976 -3.969738,-10.071504 17.058048,-3.775705 -0.0898,18.582505"
          style={{
            fill: getDistrictColor('중랑구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('중랑구')}
          onMouseEnter={() => handleDistrictHover('중랑구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 동작구 */}
        <path
          d="M 62.84227,83.54678 62.688714,96.291936 39.501748,88.614133 48.254444,78.325877"
          style={{
            fill: getDistrictColor('동작구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('동작구')}
          onMouseEnter={() => handleDistrictHover('동작구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 영등포구 */}
        <path
          d="M 46.104659,77.711649 33.205948,92.299476 25.7133,76.939435 28.599265,66.50206"
          style={{
            fill: getDistrictColor('영등포구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('영등포구')}
          onMouseEnter={() => handleDistrictHover('영등포구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />
        {/* 구로구 */}
        <path
          d="M 24.606808,78.325877 32.034042,93.008501 1.4198403,95.524155 2.0340646,81.24344"
          style={{
            fill: getDistrictColor('구로구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('구로구')}
          onMouseEnter={() => handleDistrictHover('구로구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 양천구 */}
        <path
          d="M 2.4947328,78.940097 24.299695,76.176096 26.449481,65.427167 2.3411768,69.573182"
          style={{
            fill: getDistrictColor('양천구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('양천구')}
          onMouseEnter={() => handleDistrictHover('양천구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 강서구 */}
        <path
          d="M 2.3411766,67.730508 25.374586,63.277383 11.400985,46.846881 0.34494772,46.693325"
          style={{
            fill: getDistrictColor('강서구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('강서구')}
          onMouseEnter={() => handleDistrictHover('강서구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 관악구 */}
        <path
          d="m 33.908311,93.744678 4.21143,-4.209212 24.108307,8.292032 4.29957,5.988682 -16.584057,10.59538"
          style={{
            fill: getDistrictColor('관악구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('관악구')}
          onMouseEnter={() => handleDistrictHover('관악구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 금천구 */}
        <path
          d="m 32.438166,93.988593 9.05981,15.509167 -8.138472,5.06735 -10.288257,-18.887394"
          style={{
            fill: getDistrictColor('금천구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('금천구')}
          onMouseEnter={() => handleDistrictHover('금천구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />
        {/* 서초구 */}
        <path
          d="m 76.508762,77.097429 -11.209593,6.449351 3.378234,19.04096 25.029639,14.74139 8.752698,-10.28827"
          style={{
            fill: getDistrictColor('서초구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('서초구')}
          onMouseEnter={() => handleDistrictHover('서초구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 강남구 */}
        <path
          d="m 79.272771,76.329648 15.969833,-2.610457 21.497856,26.104535 -12.89871,5.374464"
          style={{
            fill: getDistrictColor('강남구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('강남구')}
          onMouseEnter={() => handleDistrictHover('강남구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 송파구 */}
        <path
          d="m 100.77063,76.790315 15.66271,-7.063579 14.7414,15.355606 -12.13094,13.666498"
          style={{
            fill: getDistrictColor('송파구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('송파구')}
          onMouseEnter={() => handleDistrictHover('송파구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 강동구 */}
        <path
          d="m 119.0438,68.651844 1.68912,-15.355608 11.2096,-6.449355 -0.15356,36.239232"
          style={{
            fill: getDistrictColor('강동구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('강동구')}
          onMouseEnter={() => handleDistrictHover('강동구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 강북구 */}
        <path
          d="M 80.347664,32.566165 63.302939,19.360343 63.456496,5.233183 71.441413,5.3867392 86.979957,31.331061"
          style={{
            fill: getDistrictColor('강북구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('강북구')}
          onMouseEnter={() => handleDistrictHover('강북구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 도봉구 */}
        <path
          d="M 74.358977,6.0009631 90.021699,5.3867392 89.554378,30.920279"
          style={{
            fill: getDistrictColor('도봉구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('도봉구')}
          onMouseEnter={() => handleDistrictHover('도봉구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 노원구 */}
        <path
          d="M 91.609366,30.445761 109.83044,27.498814 104.30242,4.3118466 92.325042,4.7725152"
          style={{
            fill: getDistrictColor('노원구'),
            cursor: 'pointer',
            transition: 'fill 0.2s ease',
          }}
          onClick={() => onDistrictClick?.('노원구')}
          onMouseEnter={() => handleDistrictHover('노원구')}
          onMouseLeave={() => handleDistrictHover(null)}
        />

        {/* 한강 - 클릭이나 호버 효과 없음 */}
        <path
          d="m 11.017094,43.545425 16.584057,21.57463 19.655178,11.243657 16.430501,6.415287 16.304228,-8.814036 15.865775,-1.013544 4.376347,2.76401 17.73573,-7.293918 1.91945,-21.804963 -2.91757,-1.074894 -3.17424,21.336579 -11.47266,4.577145 -13.199059,-1.983061 -9.09852,-0.62527 L 64.390713,79.922257 48.646532,73.40743 30.079259,63.30944 13.032114,42.461975"
          style={{
            fill: '#4141a3',
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        />
        {/* 지울거면 이거 밑에꺼 지우면댐~낄낄 */}
        {(hoveredDistrict || selectedDistrict) && (
          <text
            x="10"
            y="20"
            fill="black"
            fontSize="14"
            className="district-name"
          >
            {hoveredDistrict || selectedDistrict}
          </text>
        )}
      </g>
    </svg>
  );
};

export default SeoulMap;
