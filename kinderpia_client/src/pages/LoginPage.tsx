import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import LoginInput from '../components/FormInput';
import axios from 'axios';
import { simpleAlert } from '../utils/alert';
import { LoginFormInputs } from '../types/user';
import { postUserLogin } from '../api/user';

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
  interface LoginData {
    loginId: string;
    userPw: string;
  }
  
  const simpleDummyLogin = async (id: number) => {
    let data: LoginData = {
      loginId: '',
      userPw: ''
    };
    
    switch (id) {
      case 1:
        data = {
          loginId: 'test1234',
          userPw: 'test1234'
        };
        break;
      case 2:
        data = {
          loginId: 'test2345',
          userPw: 'test2345'
        };
        break;
      default:
        break;
    }
    
    try {
      const result = await postUserLogin(data);

      if (!result) {
        return null;
      }
      simpleAlert('success', `환영합니다. 테스트계정${id} 로 로그인 하셨습니다.`, 'center')
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  };

  // 해당 필드를 빈 문자열로 설정
  const clearInput = (field: 'loginId' | 'userPw') => {
    setValue(field, '');
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log(data);

    try {
      const response = await postUserLogin(data);
      if (response.status === 200) {
        console.log('로그인 완료:', response);
        await simpleAlert('success', '환영합니다. 더미 유저데이터를 생성하여 로그인하였습니다.','center');
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
            href={`${process.env.REACT_APP_API_URL}/admin/`}
            aria-label="관리자 로그인"
          >
            <i className="xi-crown admin-icon"></i>
            관리자 로그인
          </a>
          <button
            onClick={()=>{simpleDummyLogin(1)}}
          >
            <i className="xi-emoticon-smiley-o test-icon"></i>
            <span>테스트 계정 1 <br/>- 모임 생성자</span>
          </button>
          <button
            onClick={()=>{simpleDummyLogin(2)}}
          >
            <i className="xi-emoticon-smiley-o test-icon"></i>
            <span>테스트 계정 2 <br/>- 모임 가입자</span>
          </button>
        </div>
      </div>
    </section>
  );
}
