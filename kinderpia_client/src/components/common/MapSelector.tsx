import React, { useState } from 'react';
import DynamicMapView from './DynamicMapView';
import { searchLocation } from '../../api/map'; // searchMap import 추가

import '../../styles/meeting/MapSelector.scss';

interface MapSelectorProps {
  location: string;
  onChange: (address: string) => void;
}

interface SearchResult {
  address: string;
  latitude: number;
  longitude: number;
}

const MapSelector: React.FC<MapSelectorProps> = ({ 
  location,
  onChange 
}) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<SearchResult>({
    address: "",
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
      const formattedResults: SearchResult[] = results.map(item => ({
        address: item.name,
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
    onChange(result.address);
  };

  return (
    <div className="map-selector-container">
      <label className="map-selector-title">모임 장소<span> *</span></label>
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