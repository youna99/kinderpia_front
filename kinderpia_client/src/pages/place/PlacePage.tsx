import React, { useState, useEffect } from 'react';

// 공통 컴포넌트 호출
import SearchInput from '../../components/common/SearchInput';
import PlaceList from '../../components/common/PlaceList';

// 타입 호출
import { PlaceListInfo } from '../../types/placelist';

// 데이터 호출 - 더미데이터 , API 호출
import { dummyPlaceList } from '../../data/tempPlaceListdata';

interface SearchResponse {
  places: PlaceListInfo[];
  total: number;
}

const PlacePage: React.FC = () => {
  const [places, setPlaces] = useState<PlaceListInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setPlaces(dummyPlaceList);
  }, []);
  
  const handleSearch = async (searchTerm: string) => {
    setIsSearching(true);
    try {
      const response = await fetch(`/api/meetings/search?query=${encodeURIComponent(searchTerm)}`);
      const data: SearchResponse = await response.json();
      setPlaces(data.places);
    } catch (error) {
      console.error('모임 검색 중 오류 발생:', error);
      // 에러 처리 로직 추가 (예: 토스트 메시지)
    } finally {
      setIsSearching(false);
    }
  };

  return (    
  <div className="meeting-page">
    <div className="meeting-search">
      <SearchInput
        placeholder="장소 검색하기"
        onSearch={handleSearch}
        isLoading={isSearching}
      />
    </div>
    
    {isSearching ? (
        <div className="meeting-search-status">검색 중...</div>
      ) : places.length > 0 ? (
        <div className="meeting-list-">
          {places.map((place) => (
            <PlaceList
              placeid = { place.placeid }
              title={place.title}
              category={place.category}
              rating={place.rating}
              priceType={place.priceType}
              image={place.image}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}
  </div>
  )
}

export default PlacePage