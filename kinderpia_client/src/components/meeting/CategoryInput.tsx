import React from "react";
import { categoryList } from '../../data/tempCategoryList';

interface CategoryInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  value,
  onChange
}) => {
  
  let MEETING_TYPES = categoryList;
  
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