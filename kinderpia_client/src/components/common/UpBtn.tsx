import React from 'react';
import '../../styles/common/UpBtn.scss';

export default function UpBtn() {
  return (
    <>
      <button className="up-btn">
        <span className="xi-caret-up up-icon"></span>
        <span className="up-txt">위로 가기</span>
      </button>
    </>
  );
}
