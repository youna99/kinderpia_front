import React from 'react';
import '../styles/common/Header.scss';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header>
        <div className="inner">
          <h1>
            <Link to={'/'}>KINDERPIA</Link>
          </h1>
          <nav>
            <ul className="header-nav">
              <li className="header-list">
                <Link to={'/meeting'}>
                  <span className="xi-group header-icon"></span>
                  <span>모임</span>
                </Link>
              </li>
              <li className="header-list">
                <Link to={'/place'}>
                  <span className="xi-maker header-icon"></span>
                  <span>장소</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
