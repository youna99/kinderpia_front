import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Layout from './layout/Layout';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MainPage from './pages/MainPage';

import Meeting from './pages/meeting/MeetingPage';
import MeetingCreate from './pages/meeting/MeetingCreatePage';
import MeetingDetail from './pages/meeting/MeetingDetailPage';
import MeetingUpdate from './pages/meeting/MeetingUpdatePage';

import PlacePage from './pages/place/PlacePage';
import PlaceDetailPage from './pages/place/PlaceDetailPage';
import MyPage from './pages/MyPage';
import EditUserPage from './pages/EditUserPage';

import ChatlistPage from './pages/ChatListPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginRequiredPage from './pages/LoginRequiredPage';
import PrivateRoute from './components/common/PrivateRoute';

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
              {/* 로그인 요구 페이지 */}
              {/* PrivateRoute(로그인 필요) -마이페이지,  개인정보수정페이지, 채팅방목록페이지, 모임생성페이지, 모임수정페이지 */}
              <Route path="login/required" element={<LoginRequiredPage />} />
              {/* 마이페이지 */}
              <Route
                path="/mypage"
                element={<PrivateRoute element={<MyPage />} />}
              />
              {/* 개인정보 수정 페이지 */}
              <Route
                path="/mypage/editUser"
                element={<PrivateRoute element={<EditUserPage />} />}
              />
              {/* 채팅방 목록 */}
              <Route
                path="chatroom/list"
                element={<PrivateRoute element={<ChatlistPage />} />}
              />
              {/* 모임 관련 라우트 */}
              <Route path="meeting">
                <Route index element={<Meeting />} />
                <Route
                  path="create"
                  element={<PrivateRoute element={<MeetingCreate />} />}
                />
                <Route path=":meetingId" element={<MeetingDetail />} />
                <Route
                  path=":meetingId/edit"
                  element={<PrivateRoute element={<MeetingUpdate />} />}
                />
              </Route>
              {/* 장소 라우트 */}
              <Route path="place">
                <Route index element={<PlacePage />} />
                <Route path=":placeId" element={<PlaceDetailPage />} />
              </Route>
              {/* 메인 페이지 */}
              <Route index element={<MainPage />} />
              {/* 404 라우트를 마지막에 추가 */}
              <Route path="not-found" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
