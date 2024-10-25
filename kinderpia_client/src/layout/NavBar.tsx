import React from 'react';
import '../styles/common/NavBar.scss';

export default function NavBar() {
  return (
    <nav className="navigation">
      <ul className="nav-lists">
        <li className="nav-list">
          <span className="xi-home nav-icon"></span>
          <span>홈</span>
        </li>
        <li className="nav-list">
          <span className="xi-users-plus nav-icon"></span>
          <span>모임 생성</span>
        </li>
        <li className="nav-list">
          <span className="xi-message-o nav-icon"></span>
          <span>채팅</span>
        </li>
        <li className="nav-list">
          <span className="xi-profile nav-icon"></span>
          <span>마이페이지</span>
        </li>
      </ul>
    </nav>
  );
}
