import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LoginPage.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import LoginInput from '../components/LoginInput';

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

  // 해당 필드를 빈 문자열로 설정
  const clearInput = (field: 'userId' | 'userPw') => {
    setValue(field, '');
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log('로그인 데이터:', data);
    //두개 다 틀리면 아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요.-> 서버의 user테이블에 해당정보가 있는지 확인후
  };

  return (
    <div className="login-container">
      <h2 className="logo">LOGIN</h2>
      <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
        <LoginInput
          label="아이디"
          type="text"
          id="userId"
          register={register}
          requiredMessage="아이디를 입력해주세요."
          clearInput={() => clearInput('userId')}
          error={errors.userId?.message}
        />
        <LoginInput
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          id="userPw"
          register={register}
          requiredMessage="비밀번호를 입력해주세요."
          clearInput={() => clearInput('userPw')}
          error={errors.userPw?.message}
          showPasswordToggle={togglePasswordVisibility}
          eyeIconClass={eyeIconClass}
          isPassword={true}
        />
        <button type="submit" className="login-btn">
          로그인
        </button>
      </form>
      <div className="link-wrap">
        <Link
          to={'/user/login'}
          className="register-link"
          aria-label="회원가입 페이지로 이동"
        >
          회원가입
        </Link>
        <a
          href="https://www.naver.com"
          className="admin-link"
          aria-label="관리자 로그인 페이지로 이동"
        >
          <span className="xi-crown admin-icon"></span>
          <span>관리자 로그인</span>
        </a>
        <button>
          <span className="xi-emoticon-smiley-o test-icon"></span>
          <span>테스트 계정 1</span>
        </button>
        <button>
          <span className="xi-emoticon-smiley-o test-icon"></span>
          <span>테스트 계정 2</span>
        </button>
      </div>
    </div>
  );
}
