import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/common/LoginRequiredPage.scss';

export default function LoginRequiredPage() {
  return (
    <section id="login-required">
      <Link to={'/user/login'} className="login-btn">
        로그인
      </Link>
      <p className="txt">로그인이 필요한 서비스 입니다.</p>
    </section>
  );
}
