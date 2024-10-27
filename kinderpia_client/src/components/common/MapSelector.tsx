interface MapSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MapSelector: React.FC<MapSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm mb-2">모임 장소</label>
      <div className="relative">
        <input 
          className="w-full p-2 border rounded"
          placeholder="장소 검색하기"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
          🔍
        </span>
      </div>
      <div className="mt-2 h-48 bg-gray-100 rounded flex items-center justify-center text-gray-400">
        Map View
      </div>
    </div>
  );
};