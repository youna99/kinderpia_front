import React from 'react';
import '../styles/common/NavBar.scss';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="navigation">
      <ul className="nav-lists">
        <li className="nav-list">
          <Link to={'/'}>
            <span className="xi-home nav-icon"></span>
            <span>홈</span>
          </Link>
        </li>
        <li className="nav-list">
          <Link to={'/meeting/create'}>
            <span className="xi-users-plus nav-icon"></span>
            <span>모임 생성</span>
          </Link>
        </li>
        <li className="nav-list">
          <Link to={'/chatroom/list'}>
            <span className="xi-message-o nav-icon"></span>
            <span>채팅</span>
          </Link>
        </li>
        <li className="nav-list">
          <Link to={'/mypage'}>
            <span className="xi-profile nav-icon"></span>
            <span>마이페이지</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
