import React, { useState, useEffect } from 'react';

// 컴포넌트 호출
import SearchInput from '../../components/common/SearchInput';
import PlaceList from '../../components/common/PlaceList';
import SeoulMap from '../../assets/seoulMap';

// 타입 호출
import { PlaceListInfo } from '../../types/placelist';

// 데이터 호출 - 더미데이터 , API 호출
import { dummyPlaceList } from '../../data/tempPlaceListdata';

// 스타일 scss 호출
import '../../styles/place/PlacePage.scss';

interface SearchResponse {
  places: PlaceListInfo[];
  total: number;
}

const PlacePage: React.FC = () => {
  const [places, setPlaces] = useState<PlaceListInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>(''); // 현재 검색어 상태 추가

  useEffect(() => {
    setPlaces(dummyPlaceList);
  }, []);

  const handleSearch = async (searchTerm: string) => {
    setIsSearching(true);
    setCurrentSearchTerm(searchTerm); // 검색어 상태 업데이트
    try {
      const response = await fetch(
        `/api/meetings/search?query=${encodeURIComponent(searchTerm)}`
      );
      const data: SearchResponse = await response.json();
      setPlaces(data.places);
    } catch (error) {
      console.error('모임 검색 중 오류 발생:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleDistrictClick = (district: string) => {
    setSelectedDistrict(district);
    handleSearch(district);
  };

  return (
    <div className="meeting-page">
      <div className="map-container">
        <SeoulMap
          onDistrictClick={handleDistrictClick}
          selectedDistrict={selectedDistrict}
        />
      </div>
      <div className="meeting-search">
        <SearchInput
          placeholder="장소 검색하기"
          onSearch={handleSearch}
          isLoading={isSearching}
        />
      </div>
      <div className="meeting-title-box">
        <div className="meeting-title">
          장소 검색
          {currentSearchTerm && (
            <span className="search-result-text">
              '{currentSearchTerm}' 에 대한 검색 결과입니다.
            </span>
          )}
        </div>
        <div className="meeting-filter">필터보기</div>
      </div>
      {isSearching ? (
        <div className="meeting-search-status">검색 중...</div>
      ) : places.length > 0 ? (
        <div className="meeting-list-item">
          {places.map((place) => (
            <PlaceList
              key={place.placeId}
              placeId={place.placeId}
              placeName={place.placeName}
              placeCategoryName={place.placeCategoryName}
              rating={place.rating}
              paid={place.paid}
              placeImg={place.placeImg}
            />
          ))}
        </div>
      ) : (
        <div className="meeting-list-404">
          {currentSearchTerm
            ? `'${currentSearchTerm}' 에 대한 검색 결과가 없습니다.`
            : '검색 결과가 없습니다.'}
        </div>
      )}
    </div>
  );
};

export default PlacePage;
