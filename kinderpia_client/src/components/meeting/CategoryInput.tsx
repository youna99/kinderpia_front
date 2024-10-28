import React from "react";

interface CategoryInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  value,
  onChange
}) => {
  
  let MEETING_TYPES = [
    { value: 'LEISURE', label: '오락 및 여가' },
    { value: 'NATURE', label: '자연 및 환경' },
    { value: 'EDUCATION', label: '교육 및 문화' },
    { value: 'EXPERIENCE', label: '체험 및 활동' },
    { value: 'SPORTS', label: '스포츠 및 운동' },
    { value: 'OTHERS', label: '기타' }
  ]
  
  return (
    <div className="titleinput-container">
      <label className="titleinput-title">모임 유형을 선택해주세요.</label>
      <select
        className="titleinput-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">모임 유형 선택하기</option>
        {MEETING_TYPES.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryInput