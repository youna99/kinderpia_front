import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from './layout/Layout';
import ChatlistPage from './pages/ChatListPage';
import store from './store';
import './App.css';
import LoginPage from './pages/LoginPage';
import PlaceLists from './pages/PlaceLists';
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
              {/* 마이페이지 */}
              <Route path="placelist" element={<PlaceLists />}></Route>
              <Route path="chatroom" element={<ChatlistPage />} />
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
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
