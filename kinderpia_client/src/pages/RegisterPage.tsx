import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import RegisterInput from '../components/FormInput';
import '../styles/RegisterPage.scss';
import termsAndConditions from '../data/termsAndConditions';
import axios from 'axios';

interface RegisterFormInputs {
  userId: string;
  userPw: string;
  pwCheck: string;
  nickName: string;
  email: string;
  phoneNum: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
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
    field: 'userId' | 'userPw' | 'pwCheck' | 'nickName' | 'email' | 'phoneNum'
  ) => {
    setValue(field, '');
  };

  // 중복 확인 API 호출
  const checkDuplicate = async (
    field: 'userId' | 'nickName' | 'email' | 'phoneNum',
    value: string
  ) => {
    const response = await axios.post(
      `https://your-api-url.com/check-${field}`,
      {
        [field]: value,
      }
    );

    return response.data.isDuplicate; // true or false
  };

  const handleDuplicateCheck = async (
    field: 'userId' | 'nickName' | 'email' | 'phoneNum',
    value: string
  ) => {
    try {
      const isDuplicate = await checkDuplicate(field, value);
      if (field === 'userId' || field === 'nickName') {
        if (isDuplicate) {
          alert(
            `${
              field === 'userId' ? '아이디' : '닉네임'
            }이(가) 이미 사용 중입니다.`
          );
        } else {
          alert(
            `${field === 'userId' ? '아이디' : '닉네임'}이(가) 사용 가능합니다.`
          );
        }
      } else if (field === 'email') {
        if (isDuplicate) {
          setError('email', {
            type: 'manual',
            message: '이메일이 이미 사용 중입니다.',
          });
        } else {
          setError('email', { type: 'manual', message: '' });
        }
      } else if (field === 'phoneNum') {
        if (isDuplicate) {
          setError('phoneNum', {
            type: 'manual',
            message: '전화번호가 이미 사용 중입니다.',
          });
        } else {
          setError('phoneNum', { type: 'manual', message: '' });
        }
      }
    } catch (error) {
      console.error('중복 확인 오류:', error);
      alert('중복 확인 중 오류가 발생했습니다.');
    }
  };

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    // 약관 동의 부분 제외
    const { agreeTerms, agreePrivacy, ...restData } = data;
    console.log('회원가입 데이터 (약관 제외):', restData);
  };

  return (
    <section id="register">
      <h2 className="title">회원가입</h2>
      <p>킨더피아 멤버가 되어보세요.</p>
      <form action="#" id="register-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box">
          <RegisterInput
            label="아이디"
            type="text"
            id="userId"
            register={register}
            requiredMessage="아이디를 입력해주세요."
            clearInput={() => clearInput('userId')}
            error={errors.userId?.message}
            regex={/^[a-z0-9]{6,12}$/}
            regexMessage="아이디는 영어, 소문자, 숫자로 6-12 자 사이여야 합니다."
            placeholder="아이디"
          />
          <button
            type="button"
            className="double-check"
            onClick={() => handleDuplicateCheck('userId', watch('userId'))}
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
            id="nickName"
            register={register}
            requiredMessage="닉네임을 입력해주세요."
            clearInput={() => clearInput('nickName')}
            error={errors.nickName?.message}
            regex={/^[가-힣a-zA-Z0-9]{2,15}$/}
            regexMessage="닉네임은 한글, 영어, 숫자로 2-15자 사이여야 합니다."
            placeholder="닉네임을 정해주세요."
          />
          <button
            type="button"
            className="double-check"
            onClick={() => handleDuplicateCheck('nickName', watch('nickName'))}
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
            onBlur={() => handleDuplicateCheck('email', watch('email'))}
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
            regexMessage="전화번호는 0-9의 숫자로 10자리 또는 11자리 숫자로만 이루어져야 합니다."
            placeholder="‘-’없이 숫자만 입력"
            onBlur={() => handleDuplicateCheck('phoneNum', watch('phoneNum'))}
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
