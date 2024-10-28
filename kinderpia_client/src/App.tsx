import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './layout/Layout';
import ChatlistPage from './pages/ChatListPage';
import ChatPage from './pages/ChatPage';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';
import Meeting from './pages/meeting/MeetingPage';
import MeetingCreate from './pages/meeting/MeetingCreatePage';
import MeetingDetail from './pages/meeting/MeetingDetailPage';
import MeetingUpdate from './pages/meeting/MeetingUpdatePage';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* 로그인 */}
              <Route path="user/login" element={<LoginPage />} />
              {/* 회원가입 */}
              <Route path="user/register" element={<RegisterPage />} />
              {/* 마이페이지 */}
              {/* 채팅방 목록 */}
              <Route path="chatroom" element={<ChatlistPage />} />
              {/* 채팅방 */}
              <Route path="chatroom/:chatroomid" element={<ChatPage />} />
              {/* 모임 관련 라우트 */}
              <Route path="meeting">
                {/* 모임 목록 페이지 */}
                <Route index element={<Meeting />} />
                {/* 모임 생성 페이지 */}
                <Route path="create" element={<MeetingCreate />} />
                {/* 모임 상세 페이지 */}
                <Route path=":meetingId" element={<MeetingDetail />} />
                {/* 모임 수정 페이지 */}
                <Route path=":meetingId/edit" element={<MeetingUpdate />} />
              </Route>
              {/* 메인 페이지 */}
              <Route index element={<MainPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
