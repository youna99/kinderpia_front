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

type SortType = 'rating' | 'time' | null;

const PlacePage: React.FC = () => {
  const [places, setPlaces] = useState<PlaceListInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [currentSearchTerm, setCurrentSearchTerm] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>(null);

  // 초기 데이터 로드
  useEffect(() => {
    setPlaces(dummyPlaceList);
  }, []);

  // 검색 함수
  const handleSearch = async (searchTerm: string, sort?: SortType) => {
    setIsSearching(true);
    setCurrentSearchTerm(searchTerm);
    try {
      // 정렬 방식을 쿼리 파라미터로 전달
      const queryParams = new URLSearchParams({
        query: searchTerm,
        ...(sort && { sort }) // sort 값이 있을 때만 추가
      });

      const response = await fetch(`/api/meetings/search?${queryParams}`);
      const data: SearchResponse = await response.json();
      setPlaces(data.places);
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // 지역 선택 핸들러
  const handleDistrictClick = (district: string) => {
    setSelectedDistrict(district);
    handleSearch(district, sortBy);
  };

  // 정렬 핸들러
  const handleSort = (type: SortType) => {
    setSortBy(type);
    setIsDropdownOpen(false);
    // 현재 검색어로 다시 검색 요청 (새로운 정렬 방식 적용)
    handleSearch(currentSearchTerm, type);
  };

  return (
    <div className="meeting-page">
      <div className="meeting-map-container">
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
      <div className="meeting-header">
        <div className="meeting-header-title">
          장소 검색
          {currentSearchTerm && (
            <span className="meeting-header-result">
              '{currentSearchTerm}' 에 대한 검색 결과입니다.
            </span>
          )}
        </div>
        <div className="meeting-header-filter">
          <div className="dropdown">
            <button 
              className="dropdown-toggle"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {sortBy === 'rating' ? '평점순' : 
               sortBy === 'time' ? '시간순' : 
               '필터보기'}
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => handleSort('rating')}>평점순</button>
                <button onClick={() => handleSort('time')}>시간순</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr/>
      {isSearching ? (
        <div className="meeting-search-status">검색 중...</div>
      ) : places.length > 0 ? (
        <div className="meeting-list-item">
          {places.map((place) => (
            <PlaceList
              key={place.placeId}
              placeId={place.placeId}
              placeName={place.placeName}
              category={place.category}
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
