import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Crown } from "../assets/crown.svg";

interface MenuItem {
  title: string;
  path: string;
  enabled: boolean;
}

interface MenuItemProps {
  item: MenuItem;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  if (!item.enabled) {
    return (
      <div 
        className="block px-6 py-3 text-sm text-gray-500 cursor-not-allowed bg-[#1e2532] hover:bg-[#1e2532]"
        title="준비 중인 기능입니다"
      >
        <span className='font-gmarket text-base flex items-center'>
          {item.title}
          <span className="ml-2 text-xs">(준비중)</span>
        </span>
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      className="block px-6 py-3 text-sm hover:bg-gray-700 transition-colors"
    >
      <span className='font-gmarket text-base'>
        {item.title}
      </span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const menuItems: MenuItem[] = [
    { title: '회원', path: '/members', enabled: true },
    { title: '신고', path: '/reports', enabled: true },
    { title: '모임', path: '/groups', enabled: false },
    { title: '블랙리스트', path: '/blacklist', enabled: false },
  ];

  return (
    <aside className="w-64 bg-[#1e2532] text-white">
      <div className="p-4">
        <Link to="/" className="flex items-center space-x-2">
          <Crown />
          <span className="h-2 font-jeju text-lg">Kinderpia</span>
          <span className='h-2 font-gmarket text-xs'> - admin</span>
        </Link>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <MenuItem key={item.path} item={item} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;