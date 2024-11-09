import React from 'react';
import { categoryList } from '../../../data/tempCategoryList';
import '../../../styles/meeting/createpage/CategoryInput.scss';
import CheckMarker from '../../common/CheckMarker';

interface CategoryInputProps {
  value: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  isRequired?: boolean;
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
          모임 유형{isRequired && <i className="xi-check"></i>}
        </label>
        <CheckMarker value={value} />
      </div>

      <hr />
      <select
        className={`category-input-select ${!value ? 'placeholder' : ''}`}
        onChange={(e) => onChange && onChange(Number(e.target.value))}
        disabled={disabled}
        value={value || ''}
      >
        <option value="" className="category-input-option">
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
