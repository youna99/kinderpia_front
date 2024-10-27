interface MapSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MapSelector: React.FC<MapSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="map-container">
      <label className="map-title">모임 장소</label>
      <div className="map-search-box">
        <input 
          className="map-search-input"
          placeholder="장소 검색하기"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="">
          🔍
        </span>
      </div>
      <div className="map-content">
        Map View
      </div>
    </div>
  );
};