import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        <div className="inner">
          <Outlet />
        </div>
        <NavBar />
      </main>
    </div>
  );
}
