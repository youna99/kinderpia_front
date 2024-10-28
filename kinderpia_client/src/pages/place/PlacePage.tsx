import React, { useState } from 'react';
import SearchInput from '../../components/common/SearchInput';
import { PlaceData } from '../../types/place';
import PlaceCard from '../../components/place/PlaceCard';

interface SearchResponse {
  places: PlaceData[];
  total: number;
}

const PlacePage: React.FC = () => {
  const [places, setPlaces] = useState<PlaceData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
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
            <PlaceCard
              id = { place.id }
              title={place.title}
              category={place.category}
              location={place.location}
              latitute={place.latitute}
              longitute={place.longitute}
              description={place.description}
              img={place.img}
              payment={place.payment}
              openTime={place.openTime}
              webPageUrl={place.webPageUrl}
              phone={place.phone}
              onClick={() => {}}
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