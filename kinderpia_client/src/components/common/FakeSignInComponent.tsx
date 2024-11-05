import React, { useState } from 'react';
import { CommonButtonProps } from '../../types/common';
import '../../styles/common/CommonButton1.scss';

interface ExtendedCommonButtonProps extends CommonButtonProps {
  type?: 'button' | 'submit' | 'reset';
  preventDefault?: boolean;
}

const FakeSignInComponent: React.FC<ExtendedCommonButtonProps> = ({
  text,
  onClick,
  disabled = false,
  isLoading: externalLoading,
  type = 'button',
  preventDefault = false
}) => {
  const [internalLoading, setInternalLoading] = useState(false);
  const isLoading = externalLoading || internalLoading;

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (preventDefault) {
      e.preventDefault();
    }
    
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
      type={type}
    >
      {isLoading ? '로딩중...' : text}
    </button>
  );
};

export default FakeSignInComponent;