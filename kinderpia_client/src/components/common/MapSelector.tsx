import React, { useState } from 'react';
import DynamicMapView from './DynamicMapView';
import { searchLocation } from '../../api/map';
import CheckMarker from '../common/CheckMarker';

import '../../styles/meeting/createpage/MapSelector.scss';

interface MapSelectorProps {
  location: string;
  district: string;
  onChangeL: (address: string) => void;
  onChangeD: (district: string) => void;
}

interface SearchResult {
  address: string;
  district : string;
  latitude: number;
  longitude: number;
}

const MapSelector: React.FC<MapSelectorProps> = ({ 
  location,
  district,
  onChangeL,
  onChangeD
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<SearchResult>({
    address: "",
    district: '',
    latitude: 37.5662952,
    longitude: 126.9779451
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearchSubmit = async () => {
    if (!searchInput.trim()) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }
    try {
      const results = await searchLocation(searchInput);
      // 응답 데이터를 SearchResult[] 형식으로 변환
      console.log(' >>>>>>> ' ,results);
      const extractDistrict = (address: string | null | undefined): string => {
        // 주소가 없거나 빈 문자열인 경우 처리
        if (!address) return '';
        
        // "구" 패턴 찾기 (서울특별시/경기도 등의 구)
        const districtMatch = address.match(/\s([^\s]+구)\s/);
        
        // 매치된 결과가 있으면 구 이름 반환, 없으면 빈 문자열 반환
        return districtMatch ? districtMatch[1] : '';
      };
      const formattedResults: SearchResult[] = results.map(item => ({
        address: item.name,
        district : extractDistrict(item.address),
        latitude: item.coordinates.lat,
        longitude: item.coordinates.lng
      }));
      
      setSearchResults(formattedResults);
      setIsDropdownOpen(true);
    } catch (error) {
      console.error('장소 검색 중 오류:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  // handleLocationSelect 함수 추가
  const handleLocationSelect = (result: SearchResult) => {
    setSelectedLocation(result);
    setSearchInput(result.address);
    setIsDropdownOpen(false);
    onChangeD(result.district);
    onChangeL(result.address);
  };

  return (
    <div className="map-selector-container">
      <div className='map-selector-header'>
        <label className="map-selector-header-title">모임 장소<span> *</span></label>
        <CheckMarker value={location} />
      </div>
      <hr/>
      <div className="map-selector-content">
        <div className="map-selector-search-box">
          <div className="map-selector-search-input-wrapper">
            <input 
              className="map-selector-search-input"
              placeholder="장소 검색하기 (Enter를 눌러 검색)"
              value={searchInput}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              // onBlur={handleSearchSubmit}
            />

          </div>

          {isDropdownOpen && searchResults.length > 0 && (
            <div className="map-selector-results-dropdown">
              {searchResults.map((result, index) => (
                <div 
                  key={index}
                  className="map-selector-result-item"
                  onClick={() => handleLocationSelect(result)}
                >
                  {result.address}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="map-selector-view-container">
          <DynamicMapView
            center={{
              lat: Number(selectedLocation?.latitude) || 37.5662952,
              lng: Number(selectedLocation?.longitude) || 126.9779451
            }}
            marker={{
              lat: Number(selectedLocation?.latitude) || 37.5662952,
              lng: Number(selectedLocation?.longitude) || 126.9779451
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MapSelector;