import React, { useState, KeyboardEvent } from 'react';
import { searchLocation } from '../../api/map';
import CheckMarker from '../common/CheckMarker';
import StaticMapView from './StaticMapView';
import '../../styles/meeting/createpage/MapSelector.scss';

interface MapSelectorProps {
  location: string;
  district: string;
  detailAddress: string;
  onChangeL: (address: string) => void;
  onChangeA: (detailAddress: string) => void;
  onChangeD: (district: string) => void;
}

interface SearchResult {
  address: string;
  district: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
}

const MapSelector: React.FC<MapSelectorProps> = ({
  location,
  district,
  detailAddress,
  onChangeL,
  onChangeA,
  onChangeD,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<SearchResult>({
    address: '',
    district: '',
    detailAddress: '',
    latitude: 37.5662952,
    longitude: 126.9779451,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchSubmit = async () => {
    if (!searchInput.trim()) {
      setSearchResults([]);
      setIsDropdownOpen(false);
      return;
    }
    
    setIsSearching(true);
    setIsDropdownOpen(true);
    
    try {
      const results = await searchLocation(searchInput);
      const extractDistrict = (address: string | null | undefined): string => {
        if (!address) return '';
      
        const tokens = address.split(' ');
        
        if (tokens[0] === '서울특별시') {
          const districtMatch = address.match(/\s([^\s]+구)\s/);
          return districtMatch ? districtMatch[1] : '';
        }
        return tokens[0] || '';
      };

      const formattedResults: SearchResult[] = results.map((item) => ({
        address: item.name,
        district: extractDistrict(item.address),
        detailAddress: item.address || item.roadAddress,
        latitude: item.coordinates.lat,
        longitude: item.coordinates.lng,
      }));

      setSearchResults(formattedResults);
    } catch (error) {
      console.error('장소 검색 중 오류:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    }
  };

  const handleLocationSelect = (result: SearchResult) => {
    setSelectedLocation(result);
    setSearchInput(result.address);
    setIsDropdownOpen(false);
    onChangeD(result.district);
    onChangeA(result.detailAddress);
    onChangeL(result.address);
  };

  return (
    <div className="map-selector-container">
      <div className="map-selector-header">
        <label className="map-selector-header-title">
          모임 장소<i className="xi-check"></i>
        </label>
        <CheckMarker value={location} />
      </div>
      <hr />
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

          {isDropdownOpen && (
            <div className="map-selector-results-dropdown">
              {isSearching ? (
                <div className="map-selector-loading">
                  <div className="spinner"></div>
                  <i className='xi-spinner-1 map-selector-spinner'></i>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="map-selector-result-item"
                    onClick={() => handleLocationSelect(result)}
                  >
                    {result.address}
                  </div>
                ))
              ) : (
                <div className="map-selector-no-results">
                  검색 결과가 없습니다
                </div>
              )}
            </div>
          )}
        </div>

        <div className="map-selector-view-container">
          <StaticMapView location={selectedLocation.detailAddress} />
        </div>
      </div>
    </div>
  );
};

export default MapSelector;