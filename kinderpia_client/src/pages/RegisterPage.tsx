import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import RegisterInput from '../components/FormInput';
import '../styles/RegisterPage.scss';
import termsAndConditions from '../data/termsAndConditions';
import axios from 'axios';
import { showAlert, simpleAlert } from '../utils/alert';
import { useNavigate } from 'react-router-dom';
import FakeSignInComponent from '../components/common/FakeSignInComponent';
import { fakeSignInLogIn } from '../api/meetinglist';

interface RegisterFormInputs {
  loginId: string;
  userPw: string;
  pwCheck: string;
  nickname: string;
  email: string;
  phoneNum: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
}

function generateFourDigitNumber() {
  return Math.floor(Math.random() * 9000) + 1000;
}

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm<RegisterFormInputs>({
    mode: 'onChange',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [eyeIconClass, setEyeIconClass] = useState('xi-eye');
  const [isLoginIdChecked, setIsLoginIdChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isPhoneNumChecked, setIsPhoneNumChecked] = useState(false);
  const [dummyNumber, setDummyNumber] = useState(generateFourDigitNumber());
  const navigate = useNavigate();

  // 비밀번호 보이기/안보이기 아이콘 토글
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => {
      const newShowPassword = !prev;
      setEyeIconClass(newShowPassword ? 'xi-eye-off' : 'xi-eye');
      return newShowPassword;
    });
  };

  // 인풋창 지우기 함수
  const clearInput = (
    field: 'loginId' | 'userPw' | 'pwCheck' | 'nickname' | 'email' | 'phoneNum'
  ) => {
    setValue(field, '');
  };

  // 400번 유효성검사에러 409 이미사용중인정보
  // 중복 검사 API 호출 함수
  const handleCheckDuplicate = async (
    field: 'loginId' | 'nickname' | 'email' | 'phoneNum',
    value: string
  ) => {
    if (!value) {
      const message =
        field === 'loginId'
          ? '아이디를 입력해주세요.'
          : field === 'nickname'
          ? '닉네임을 입력해주세요.'
          : field === 'email'
          ? '이메일을 입력해주세요.'
          : '전화번호를 입력해주세요.';
      setError(field, { type: 'manual', message });
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/user/check/${field}`,
        { [field]: value },
        { withCredentials: true }
      );

      if (response.data.data === false) {
        simpleAlert('success', `${response.data.message}`);
        if (field === 'loginId') setIsLoginIdChecked(true);
        else if (field === 'nickname') setIsNicknameChecked(true);
        else if (field === 'email') setIsEmailChecked(true);
        else if (field === 'phoneNum') setIsPhoneNumChecked(true);
      }
    } catch (error: any) {
      const status = error.response?.data.status;
      const message = error.response?.data.message;
      if (status === 409 || status === 400) {
        setError(field, { type: 'manual', message });
      }
    }
  };

  // 폼 제출 함수
  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    if (!isLoginIdChecked) {
      setError('loginId', {
        type: 'manual',
        message: '아이디 중복 검사를 완료해주세요.',
      });
      return;
    }

    if (data.userPw !== data.pwCheck) {
      setError('pwCheck', {
        type: 'manual',
        message: '비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    if (!isNicknameChecked) {
      setError('nickname', {
        type: 'manual',
        message: '닉네임 중복 검사를 완료해주세요.',
      });
      return;
    }

    if (!isEmailChecked) {
      setError('email', {
        type: 'manual',
        message: '이메일 중복 검사를 완료해주세요.',
      });
      return;
    }

    if (!isPhoneNumChecked) {
      setError('phoneNum', {
        type: 'manual',
        message: '전화번호 중복 검사를 완료해주세요.',
      });
      return;
    }

    try {
      console.log(data);
      
      await axios.post('http://localhost:8080/api/user/register', data, {
        withCredentials: true,
      });
      showAlert('success', '회원가입에 성공했습니다!');
      navigate('/user/login');
    } catch (error) {
      showAlert('error', '회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const fakeSignIn = async ()=>{
    // setIsEmailChecked(true);
    // setIsNicknameChecked(true);
    // setIsEmailChecked(true);
    // setIsEmailChecked(true);
    // setIsPhoneNumChecked(true);
    const faker = await fakeSignInLogIn(dummyNumber);
    if(faker){
      await simpleAlert('success', '로그인 성공!','center');
      navigate('/');
    }else{
      await simpleAlert('error', '무작위 계정 생성에 실패했습니다.', 'center');
    }
  }

  return (
    <section id="register">
      <h2 className="title">회원가입</h2>
      <p>킨더피아 멤버가 되어보세요.</p>
      <FakeSignInComponent
        text={`더미 회원가입 해버리기~  LoginId : test${dummyNumber}, password : test1234`}
        onClick={fakeSignIn}
      />
      <form action="#" id="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box">
          <RegisterInput
            label="아이디"
            type="text"
            id="loginId"
            register={register}
            requiredMessage="아이디를 입력해주세요."
            clearInput={() => clearInput('loginId')}
            error={errors.loginId?.message}
            regex={/^[a-z0-9]{6,12}$/}
            regexMessage="아이디는 6글자 이상 12글자 이하이며, 영어 소문자와 숫자만 가능합니다."
            placeholder="아이디"
          />
          <button
            type="button"
            className="double-check"
            onClick={() => handleCheckDuplicate('loginId', watch('loginId'))}
          >
            중복확인
          </button>
        </div>
        <div className="input-box">
          <RegisterInput
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            id="userPw"
            register={register}
            requiredMessage="비밀번호를 입력해주세요."
            clearInput={() => clearInput('userPw')}
            error={errors.userPw?.message}
            isPassword={true}
            regex={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,16}$/}
            regexMessage="비밀번호는 영어와 숫자를 포함하고 8-16자 사이여야 합니다."
            placeholder="비밀번호"
          />
        </div>
        <div className="input-box">
          <RegisterInput
            label="비밀번호 확인"
            type={showPassword ? 'text' : 'password'}
            id="pwCheck"
            register={register}
            requiredMessage="비밀번호를 입력해주세요."
            clearInput={() => clearInput('pwCheck')}
            error={errors.pwCheck?.message}
            showPasswordToggle={togglePasswordVisibility}
            eyeIconClass={eyeIconClass}
            isPassword={true}
            regex={/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,16}$/}
            regexMessage="비밀번호는 영어와 숫자를 포함하고 8-16자 사이여야 합니다."
            placeholder="비밀전호 재확인"
          />
        </div>
        <div className="input-box">
          <RegisterInput
            label="닉네임"
            type="text"
            id="nickname"
            register={register}
            requiredMessage="닉네임을 입력해주세요."
            clearInput={() => clearInput('nickname')}
            error={errors.nickname?.message}
            regex={/^[가-힣a-zA-Z0-9]{2,15}$/}
            regexMessage="닉네임은 2글자 이상 15글자 이하이며, 한글, 영어, 숫자만 가능합니다."
            placeholder="닉네임을 정해주세요."
          />
          <button
            type="button"
            className="double-check"
            onClick={() => handleCheckDuplicate('nickname', watch('nickname'))}
          >
            중복확인
          </button>
        </div>
        <div className="input-box">
          <RegisterInput
            label="이메일"
            type="email"
            id="email"
            register={register}
            requiredMessage="이메일을 입력해주세요."
            clearInput={() => clearInput('email')}
            error={errors.email?.message}
            regex={/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/}
            regexMessage="올바른 이메일 형식이 아닙니다. (예: user@gmail.com)"
            placeholder="ex) user@gmail.com"
            onBlur={() => handleCheckDuplicate('email', watch('email'))}
          />
        </div>
        <div className="input-box">
          <RegisterInput
            label="전화번호"
            type="number"
            id="phoneNum"
            register={register}
            requiredMessage="전화번호를 입력해주세요."
            clearInput={() => clearInput('phoneNum')}
            error={errors.phoneNum?.message}
            regex={/^[0-9]{10,11}$/}
            regexMessage="전화번호는 10~11자리 숫자여야 합니다."
            placeholder="‘-’없이 숫자만 입력"
            onBlur={() => handleCheckDuplicate('phoneNum', watch('phoneNum'))}
          />
        </div>
        <div id="agree">
          <label className="label">약관 동의</label>
          <div className="agree-wrap">
            <div className="agree-box">
              <input
                type="checkbox"
                {...register('agreeTerms', {
                  required: '이용약관에 동의해야 합니다.',
                })}
                id="agreeTerms"
              />
              <label htmlFor="agreeTerms">
                <span>&#91;필수&#93;</span> 이용약관
              </label>
            </div>
            <div className="agree-txt">
              {termsAndConditions.serviceTerms.map((term, index) => (
                <p key={index}>
                  <b>{term.title}</b>
                  <br />
                  {Array.isArray(term.content)
                    ? term.content.map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))
                    : term.content}
                </p>
              ))}
            </div>
            {errors.agreeTerms && (
              <div className="errmsg-box">
                <p className="err-msg">{errors.agreeTerms.message}</p>
              </div>
            )}
            <div className="agree-box agreePrivacy-box">
              <input
                type="checkbox"
                {...register('agreePrivacy', {
                  required: '개인정보 수집 및 이용에 동의해야 합니다.',
                })}
                id="agreePrivacy"
              />
              <label htmlFor="agreePrivacy">
                <span>&#91;필수&#93;</span> 개인정보 수집 및 이용
              </label>
            </div>
            <div className="agree-txt">
              {termsAndConditions.privacyPolicy.map((policy, index) => (
                <p key={index}>
                  <b>{policy.title}</b>
                  <br />
                  {Array.isArray(policy.content)
                    ? policy.content.map((line, i) => (
                        <span key={i}>
                          {line}
                          <br />
                        </span>
                      ))
                    : policy.content}
                </p>
              ))}
            </div>
          </div>
          {errors.agreePrivacy && (
            <div className="errmsg-box">
              <p className="err-msg">{errors.agreePrivacy.message}</p>
            </div>
          )}
        </div>
        <button className="register-btn">회원가입</button>
      </form>
    </section>
  );
}
