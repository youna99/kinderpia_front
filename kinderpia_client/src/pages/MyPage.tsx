// MyPage.tsx
import React, { useEffect, useState } from 'react';
import MyInfo from '../components/MyPage/MyInfo';
import MyReviews from '../components/MyPage/MyReviews';
import MeetingHistory from '../components/MyPage/MeetingHistory';
import Tab from '../components/MyPage/Tab';
import '../styles/mypage/MyPage.scss';
import axios from 'axios';

const MyPage: React.FC = () => {
  const tabs = ['내 정보', '모임 내역', '나의 리뷰'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [userId, setUserId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null); // 유저 정보를 저장할 상태

  // 토큰값 추출하는 임시 코드--> 토큰을 서버에 넘겨주고 통신해야되는게 맞는듯
  const extractUserIdFromToken = (token: string): string | null => {
    if (!token) return null;

    try {
      // 토큰에서 Bearer 부분 제거
      const tokenWithoutBearer = token.split(' ')[1];
      const payload = tokenWithoutBearer.split('.')[1]; // 페이로드 부분 가져오기
      const decodedPayload = JSON.parse(atob(payload)); // Base64 디코딩 후 JSON으로 변환
      return decodedPayload.sub; // 사용자 ID로 사용할 필드
    } catch (error) {
      console.error('토큰에서 사용자 ID 추출 중 오류 발생:', error);
      return null;
    }
  };

  // 사용자 조회 api
  const fetchUserInfo = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/${userId}`,
        {
          withCredentials: true,
        }
      );
      setUserInfo(response.data.data); // 응답 데이터를 상태로 설정
    } catch (error) {
      console.error('유저 정보를 불러오는 중 오류 발생:', error);
    }
  };

  // 컴포넌트가 처음 마운트될 때 실행
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const userIdFromToken = extractUserIdFromToken(token);
      if (userIdFromToken) {
        setUserId(userIdFromToken);
        fetchUserInfo(userIdFromToken); // 사용자 정보 요청
      }
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case '내 정보':
        return <MyInfo userId={userId} userInfo={userInfo} />;
      case '모임 내역':
        return <MeetingHistory userId={userId} />;
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
