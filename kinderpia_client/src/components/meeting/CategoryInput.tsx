import React from 'react';
import { categoryList } from '../../data/tempCategoryList';
import '../../styles/meeting/CategoryInput.scss';

// interface CategoryInputProps {
//   value: string;
//   onChange: (value: string) => void;
// }
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
  isRequired = true, // 기본값을 true로 설정
}) => {
  const MEETING_TYPES = categoryList;

  return (
    <div className="category-input-container">
      <label className="category-input-title">
        모임 유형{isRequired && <span> *</span>}
      </label>
      <hr />
      <select
        className={`category-input-select`}
        onChange={(e) => onChange && onChange(e.target.value)}
        disabled={disabled}
      >
        <option disabled className="category-input-option" value="">
          모임 유형 선택하기
        </option>
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
};

export default CategoryInput;
