import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as Crown } from "../assets/crown.svg";

interface MenuItem {
  title: string;
  path: string;
  enabled: boolean;
}

interface MenuItemProps {
  item: MenuItem;
  isActive: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, isActive }) => {
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
      className={`block px-6 py-3 text-sm transition-colors
        ${isActive 
          ? 'bg-gray-700 border-l-4 border-blue-500' 
          : 'hover:bg-gray-700'
        }`}
    >
      <span className='font-gmarket text-base flex items-center'>
        {item.title}
        {isActive && <span className="ml-2 text-xs text-blue-400">●</span>}
      </span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems: MenuItem[] = [
    { 
      title: '회원', 
      path: '/members', 
      enabled: true 
    },
    { 
      title: '신고', 
      path: '/reports', 
      enabled: true 
    },
    { 
      title: '모임', 
      path: '/meetings', 
      enabled: true 
    },
    { 
      title: '블랙리스트', 
      path: '/blacklist', 
      enabled: false 
    },
  ];

  // 현재 경로가 메뉴 아이템의 경로와 일치하는지 확인
  const isCurrentPath = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <aside className="w-64 bg-[#1e2532] text-white h-full min-h-screen">
      <div className="p-4 border-b border-gray-700">
        <Link 
          to="/" 
          className="flex items-center space-x-2 hover:text-blue-400 transition-colors"
        >
          <Crown className="w-6 h-6" />
          <span className="font-jeju text-lg">Kinderpia</span>
          <span className='font-gmarket text-xs'> - admin</span>
        </Link>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <MenuItem 
            key={item.path} 
            item={item} 
            isActive={isCurrentPath(item.path)}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;