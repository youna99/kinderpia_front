import React from "react";
import { categoryList } from '../../data/tempCategoryList';
import '../../styles/meeting/CategoryInput.scss'

interface CategoryInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  value,
  onChange
}) => {
  const MEETING_TYPES = categoryList;
  
  return (
    <div className="category-input-container">
      <label className="category-input-title">모임 유형을 선택해주세요.<span> *</span></label>
      <hr/>
      <select
        className={`category-input-select`}
        onChange={(e) => onChange(e.target.value)}
      >
        <option
          disabled
          className="category-input-option"
          value=""
        >모임 유형 선택하기</option>
        {MEETING_TYPES.map((type) => (
          <option 
            className="category-input-option" 
            key={type.value} 
            value={type.value}
          >
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryInput;