import React from 'react';
import { categoryList } from '../../data/tempCategoryList';
import '../../styles/meeting/createpage/CategoryInput.scss';
import CheckMarker from '../common/CheckMarker';

interface CategoryInputProps {
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  isRequired?: boolean; // 필수 여부(*)를 결정하는 prop 추가
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  value,
  onChange,
  disabled,
  isRequired = true,
}) => {
  const MEETING_TYPES = categoryList;

  return (
    <div className="category-input-container">
      <div className="category-input-header">      
        <label className="category-input-header-title">
          모임 유형{isRequired && <span> *</span>}
        </label>
        <CheckMarker value={value} />
      </div>

      <hr />
      <select
        className={`category-input-select ${!value ? 'placeholder' : ''}`}  // placeholder 클래스 조건부 추가
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="" className="category-input-option">
          모임 유형 선택하기
        </option>
        {MEETING_TYPES.map((type) => (
          <option
            className="category-input-option"
            key={type.value}
            value={type.value}
            // selected={value === type.value}  // 현재 value와 일치하는 항목 선택
          >
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryInput;
