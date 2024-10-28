import MapView from './MapView';

interface MapSelectorProps {
  location: string;
  latitute: number;
  longitute: number;
  onChange: (value: string) => void;
}

const MapSelector: React.FC<MapSelectorProps> = ({ 
  location,
  latitute,
  longitute,
  onChange 
}) => {
  return (
    <div className="map-container">
      <label className="map-title">모임 장소</label>
      <div className="map-search-box">
        <input 
          className="map-search-input"
          placeholder="장소 검색하기"
          value={location}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="map-search-input-btn">
          🔍
        </span>
      </div>
      <MapView
        latitute={latitute}
        longitute={longitute}
      />
    </div>
  );
};

export default MapSelector;