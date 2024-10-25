import React from 'react';
import '../styles/common/Header.scss';

export default function Header() {
  return (
    <>
      <header>
        <div className="inner">
          <h1>KINDERPIA</h1>
          <nav>
            <ul className="header-nav">
              <li className="header-list">
                {/* <Link > */}
                <span className="xi-group header-icon"></span>
                <span>모임</span>
                {/* </Link> */}
              </li>
              <li className="header-list">
                <span className="xi-maker header-icon"></span>
                <span>장소</span>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
