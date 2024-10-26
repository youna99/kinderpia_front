import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/domain/LoginPage.scss';
import { SubmitHandler, useForm } from 'react-hook-form';

interface LoginFormInputs {
  userId: string;
  userPw: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormInputs>({
    mode: 'onBlur',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [eyeIconClass, setEyeIconClass] = useState('xi-eye');

  // 비밀번호 보이기 토글
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => {
      const newShowPassword = !prev;
      setEyeIconClass(newShowPassword ? 'xi-eye-off' : 'xi-eye');
      return newShowPassword;
    });
  };

  const clearInput = (field: 'userId' | 'userPw') => {
    setValue(field, ''); // 해당 필드를 빈 문자열로 설정
  };

  // 로그인버튼눌렀을때
  // 아이디 없으면 아이디를 입력해주세요 ok
  // 비밀번호 없으면 비밀번호를 입력해주세요 ok
  //두개 다 틀리면 아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.-> 서버의 user테이블에 해당정보가 있는지 확인후

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log('로그인 데이터:', data);
  };

  return (
    <div className="login-container">
      <h2 className="logo">LOGIN</h2>
      <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrap">
          <label htmlFor="userId" className="label">
            아이디
          </label>
          <input
            type="text"
            id="userId"
            {...register('userId', { required: '아이디를 입력해주세요.' })}
            onFocus={(e) => {
              const label = e.target.previousElementSibling;
              if (label && !e.target.value) {
                label.classList.add('shrink');
              }
            }}
            onBlur={(e) => {
              const label = e.target.previousElementSibling;
              if (label && !e.target.value) {
                label.classList.remove('shrink');
              }
            }}
          />
          <span
            className="xi-close-circle eraser-icon"
            onClick={() => clearInput('userId')}
          ></span>
        </div>
        <div className="input-wrap">
          <label htmlFor="userPw" className="label">
            비밀번호
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="userPw"
            {...register('userPw', { required: '비밀번호를 입력해주세요.' })}
            onFocus={(e) => {
              const label = e.target.previousElementSibling;
              if (label && !e.target.value) {
                label.classList.add('shrink');
              }
            }}
            onBlur={(e) => {
              const label = e.target.previousElementSibling;
              if (label && !e.target.value) {
                label.classList.remove('shrink');
              }
            }}
          />
          <span
            className="xi-close-circle eraser-icon"
            onClick={() => clearInput('userPw')}
          ></span>
          <span
            className={`${eyeIconClass} eye-icon`}
            onClick={togglePasswordVisibility}
          ></span>
          <div className="errmsg-box">
            {errors.userId && (
              <span className="err-msg">{errors.userId.message}</span>
            )}
            {errors.userPw && (
              <span className="err-msg">{errors.userPw.message}</span>
            )}
          </div>
        </div>
        <button type="submit" className="login-btn">
          로그인
        </button>
      </form>
      <div className="link-wrap">
        <Link to={'/user/login'} className="register-link">
          회원가입
        </Link>
        <a href="https://www.naver.com" className="admin-link">
          관리자 로그인
        </a>
      </div>
    </div>
  );
}
