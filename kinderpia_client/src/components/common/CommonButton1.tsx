import React, { useState } from 'react';
import { CommonButtonProps } from '../../types/commonButton';

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
      console.error('Button onClick error:', error);
    } finally {
      setInternalLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? '로딩중...' : text}
    </button>
  );
};

export default CommonButton1;