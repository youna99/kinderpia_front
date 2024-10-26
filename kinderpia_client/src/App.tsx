import React from 'react';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* 로그인 */}
            <Route path="/user/login" element={<LoginPage />} />
            {/* 회원가입 */}
            {/* 마이페이지 */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
