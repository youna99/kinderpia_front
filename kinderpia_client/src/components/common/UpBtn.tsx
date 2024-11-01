import React, { useEffect, useState } from 'react';
import '../../styles/common/UpBtn.scss';

export default function UpBtn() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button className="up-btn" onClick={scrollToTop}>
          <span className="xi-caret-up up-icon"></span>
          <span className="up-txt">위로 가기</span>
        </button>
      )}
    </>
  );
}
