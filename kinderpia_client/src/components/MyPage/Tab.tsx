// Tab.tsx
import React from 'react';
import '../../styles/mypage/Tab.scss';

interface TabProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Tab: React.FC<TabProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tab">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={activeTab === tab ? 'active' : ''}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tab;
