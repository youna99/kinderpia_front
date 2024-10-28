import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Layout from "./layout/Layout";
import ChatlistPage from "./pages/ChatListPage";
import store from "./store";
import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import PlaceLists from './pages/PlaceLists';

import Meeting from './pages/meeting/Meeting';
import MeetingCreate from './pages/meeting/MeetingCreate';
import MeetingDetail from './pages/meeting/MeetingDetail';
import MeetingUpdate from './pages/meeting/MeetingUpdate';

function App() {
  return (
    <div className="App">
      <Provider store={store}>  
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="placelist" element={<PlaceLists />}></Route>
              <Route path="/chats" element={<ChatlistPage />} />
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