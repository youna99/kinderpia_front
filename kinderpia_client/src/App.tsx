import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';

import Meeting from './pages/meeting/Meeting';
import MeetingCreate from './pages/meeting/MeetingCreate';
import MeetingDetail from './pages/meeting/MeetingDetail';
import MeetingUpdate from './pages/meeting/MeetingUpdate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
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
    </div>
  );
}

export default App;