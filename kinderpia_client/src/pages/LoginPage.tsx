import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import LoginInput from '../components/FormInput';
import axios from 'axios';
import { simpleAlert } from '../utils/alert';

interface LoginFormInputs {
  loginId: string;
  userPw: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<LoginFormInputs>({
    mode: 'onBlur',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [eyeIconClass, setEyeIconClass] = useState('xi-eye');
  const navigate = useNavigate();

  // 비밀번호 보이기 토글
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => {
      const newShowPassword = !prev;
      setEyeIconClass(newShowPassword ? 'xi-eye-off' : 'xi-eye');
      return newShowPassword;
    });
  };

  // 해당 필드를 빈 문자열로 설정
  const clearInput = (field: 'loginId' | 'userPw') => {
    setValue(field, '');
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log(data);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/user/login',
        data,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // console.log('로그인 완료:', response)

        // 일단 세션에 저장
        // const token = response.headers['authorization'];
        // sessionStorage.setItem('token', token);

        await simpleAlert('success', '로그인 성공!');
        navigate('/');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 401 || status === 404) {
          setError('userPw', {
            type: 'manual',
            message: '아이디 또는 비밀번호가 잘못 되었습니다.',
          });
        } else if (status === 403) {
          setError('userPw', {
            type: 'manual',
            message: '탈퇴한 사용자입니다.',
          });
        } else {
          setError('userPw', {
            type: 'manual',
            message: '알 수 없는 오류가 발생했습니다.',
          });
        }
      }
    }
  };

  return (
    <section id="login">
      <div className="login-container">
        <h2 className="title">LOGIN</h2>
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <LoginInput
            label="아이디"
            type="text"
            id="loginId"
            register={register}
            requiredMessage="아이디를 입력해주세요."
            clearInput={() => clearInput('loginId')}
            error={errors.loginId?.message}
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
            to={'/user/register'}
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
    </section>
  );
}
