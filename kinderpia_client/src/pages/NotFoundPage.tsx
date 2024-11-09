// src/pages/NotFoundPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common/NotFoundPage.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>페이지를 찾을 수 없습니다</h2>
      <p>요청하신 페이지가 사라졌거나, 잘못된 경로를 입력하셨습니다.</p>
      <div className="not-found-actions">
        <button onClick={() => navigate('/')}>
          메인으로
        </button>
        <button onClick={() => navigate(-1)}>
          이전 페이지로
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;