// MyPage.tsx
import React, { useState } from 'react';
import MyInfo from '../components/MyPage/MyInfo';
import MyReviews from '../components/MyPage/MyReviews';
import Tab from '../components/MyPage/Tab';
import '../styles/mypage/MyPage.scss';
import MeetingHistory from '../components/MyPage/MeetingHistory';

const MyPage: React.FC = () => {
  const tabs = ['내 정보', '모임 내역', '나의 리뷰'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const renderContent = () => {
    switch (activeTab) {
      case '내 정보':
        return <MyInfo />;
      case '모임 내역':
        return <MeetingHistory />;
      case '나의 리뷰':
        return <MyReviews />;
      default:
        return null;
    }
  };

  return (
    <section id="mypage">
      <div className="title-wrap">
        <h2 className="title">마이페이지</h2>
      </div>
      <Tab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </section>
  );
};

export default MyPage;
