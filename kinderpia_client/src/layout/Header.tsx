import React, { useState } from 'react';
import '../styles/common/Header.scss';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <header>
        <div className="inner">
          <h1>
            <Link to={'/'}>KINDERPIA</Link>
          </h1>
          <button className="xi-bars nav-icon" onClick={toggleMenu}></button>
          <nav className="dropdown-menu">
            {isMenuOpen && (
              <ul className="header-nav">
                <li className="header-list">
                  <Link to={'/login'}>로그인</Link>
                </li>
                <li className="header-list">
                  <Link to={'/signup'}>회원가입</Link>
                </li>
                <li className="header-list">
                  <Link to={'/meeting'}>모임 찾기</Link>
                </li>
                <li className="header-list">
                  <Link to={'/place'}>장소 찾기</Link>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
