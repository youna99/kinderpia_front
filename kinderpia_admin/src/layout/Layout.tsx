import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        <div className="inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
