import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import NavBar from './NavBar';
import UpBtn from '../components/common/UpBtn';

export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        <div className="inner">
          <Outlet />
        </div>
        <UpBtn />
        <NavBar />
      </main>
      <Footer />
    </div>
  );
}
