import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { title: '회원', path: '/members' },
    { title: '모임', path: '/groups' },
    { title: '신고', path: '/reports' },
    { title: '블랙리스트', path: '/blacklist' },
  ];

  return (
    <aside className="w-64 bg-[#1e2532] text-white">
      <div className="p-4">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/kinderpia-logo.png" alt="Kinderpia" className="h-8" />
        </Link>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="block px-6 py-3 text-sm hover:bg-gray-700 transition-colors"
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;