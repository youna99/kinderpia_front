import React, { useEffect, useState } from 'react';
import '../styles/common/Header.scss';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const menu = document.querySelector('.menu');
    const button = document.querySelector('.nav-icon');

    // 메뉴와 버튼 외부를 클릭했을 때 메뉴 닫기
    if (
      isMenuOpen &&
      menu &&
      button &&
      !menu.contains(event.target as Node) &&
      !button.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMenuOpen]);
  return (
    <>
      <header>
        <div className="inner">
          <h1>
            <Link to={'/'}>KINDERPIA</Link>
          </h1>
          <button
            className={`nav-icon ${isMenuOpen ? 'xi-close' : 'xi-bars'}`}
            onClick={toggleMenu}
          ></button>
          <nav className={`menu ${isMenuOpen ? 'open' : ''}`}>
            <strong>MENU</strong>
            {isMenuOpen && (
              <ul className="header-nav">
                <li className="header-list">
                  <Link to={'/meeting'} onClick={handleLinkClick}>
                    모임 찾기
                  </Link>
                </li>
                <li className="header-list">
                  <Link to={'/place'} onClick={handleLinkClick}>
                    장소 찾기
                  </Link>
                </li>
                <li className="header-list">
                  <Link
                    to={'/user/login'}
                    className="login-btn"
                    onClick={handleLinkClick}
                  >
                    LOGIN
                  </Link>
                </li>
                <li className="header-list">
                  <Link
                    to={'user/register'}
                    className="register-btn"
                    onClick={handleLinkClick}
                  >
                    회원가입
                  </Link>
                </li>
              </ul>
            )}
            <div className="project-info inner">
              <div className="footer-info">
                <a href="https://github.com/SeSAC-3rd-Kinderpia">
                  <span className="xi-github-alt"></span>
                  <span className="footer-infotxt">github</span>
                </a>
              </div>
              <p className="copyright">
                &copy;
                <span className="this-year">{new Date().getFullYear()}</span>
                킨더피아
              </p>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
