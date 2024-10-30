import React, { useState } from 'react';
import { CommonButtonProps } from '../../types/common';
import '../../styles/common/CommonButton1.scss';

const CommonButton1: React.FC<CommonButtonProps> = ({
  text,
  onClick,
  disabled = false,
  isLoading: externalLoading
}) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const isLoading = externalLoading || internalLoading;

  const handleClick = async () => {
    try {
      setInternalLoading(true);
      await onClick();
    } catch (error) {
      console.error('이상한 에러가 났어요!:', error);
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <button
      className='common-btn'
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? '로딩중...' : text}
    </button>
  );
};

export default CommonButton1;