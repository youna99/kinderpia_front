import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/common/Header.scss';
import SideTabs from '../components/SideTabs';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="inner">
        <h1>
          <Link to={'/'}>KINDERPIA</Link>
        </h1>
        <button className={`nav-icon xi-bars`} onClick={toggleMenu}></button>
      </div>
      {isMenuOpen && <SideTabs />}
    </header>
  );
};

export default Header;
