import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import RegisterInput from '../components/FormInput';
import '../styles/RegisterPage.scss';
import termsAndConditions from '../data/termsAndConditions';
import axios from 'axios';
import { showAlert, simpleAlert } from '../utils/alert';
import { useNavigate } from 'react-router-dom';
import { requestHeader } from '../api/requestHeader';

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

  // 중복 확인 API 호출 함수
  const checkDuplicate = async (
    field: 'loginId' | 'nickname' | 'email' | 'phoneNum',
    value: string
  ) => {
    try {
      const response = await requestHeader.post(`/api/user/check/${field}`, {
        [field]: value,
      });

      if (response.status === 200) {
        return false; // 중복이 아님
      } else if (response.status === 409) {
        return true; // 중복됨
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 400) {
          if (field === 'loginId') {
            setError('loginId', {
              type: 'manual',
              message: '아이디 형식이 유효하지 않습니다.',
            });
          } else if (field === 'nickname') {
            setError('nickname', {
              type: 'manual',
              message: '닉네임 형식이 유효하지 않습니다.',
            });
          } else if (field === 'email') {
            setError('email', {
              type: 'manual',
              message: '이메일 형식이 유효하지 않습니다.',
            });
          } else if (field === 'phoneNum') {
            setError('phoneNum', {
              type: 'manual',
              message: '전화번호 형식이 유효하지 않습니다.',
            });
          }
        }
      }
      // 예외 상황에서는 기본적으로 중복으로 간주
      return true; // 기본적으로 중복으로 간주
    }

    return false; // 기본적으로 중복이 아님
  };

  const handleDuplicateCheck = async (
    field: 'loginId' | 'nickname' | 'email' | 'phoneNum',
    value: string
  ) => {
    // 필드가 빈 값일 경우 처리
    if (!value) {
      setError(field, {
        type: 'manual',
        message: `${
          field === 'loginId'
            ? '아이디'
            : field === 'nickname'
            ? '닉네임'
            : field === 'email'
            ? '이메일'
            : '전화번호'
        }를 입력해주세요.`,
      });
      return;
    }

    try {
      const isDuplicate = await checkDuplicate(field, value);

      if (field === 'loginId' || field === 'nickname') {
        if (isDuplicate) {
          showAlert(
            'warning',
            `이미 사용 중인 ${
              field === 'loginId' ? '아이디' : '닉네임'
            } 입니다.`
          );
          setError(field, {
            type: 'manual',
            message: `이미 사용 중인 ${
              field === 'loginId' ? '아이디' : '닉네임'
            } 입니다.`,
          });
        } else {
          alert(
            `${
              field === 'loginId' ? '아이디' : '닉네임'
            }이(가) 사용 가능합니다.`
          );
          setError(field, { type: 'manual', message: '' }); // 에러 메시지 클리어
        }
      } else if (field === 'email') {
        if (isDuplicate) {
          setError('email', {
            type: 'manual',
            message: '이메일이 이미 사용 중입니다.',
          });
        } else {
          setError('email', { type: 'manual', message: '' }); // 에러 메시지 클리어
        }
      } else if (field === 'phoneNum') {
        if (isDuplicate) {
          setError('phoneNum', {
            type: 'manual',
            message: '전화번호가 이미 사용 중입니다.',
          });
        } else {
          setError('phoneNum', { type: 'manual', message: '' }); // 에러 메시지 클리어
        }
      }
    } catch (error) {
      console.error('중복 확인 오류:', error);
    }
  };

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const { agreeTerms, agreePrivacy, ...restData } = data;

    try {
      const response = await requestHeader.post('/api/user/register', restData);
      if (response.status === 201) {
        simpleAlert('success', '회원가입이 완료되었습니다!');
        navigate('/user/login');
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      simpleAlert('error', '회원가입 중 오류가 발생했습니다.');
    }
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
            id="loginId"
            register={register}
            requiredMessage="아이디를 입력해주세요."
            clearInput={() => clearInput('loginId')}
            error={errors.loginId?.message}
            regex={/^[a-z0-9]{6,12}$/}
            regexMessage="아이디는 영어, 소문자, 숫자로 6-12 자 사이여야 합니다."
            placeholder="아이디"
          />
          <button
            type="button"
            className="double-check"
            onClick={() => handleDuplicateCheck('loginId', watch('loginId'))}
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
            regexMessage="닉네임은 한글, 영어, 숫자로 2-15자 사이여야 합니다."
            placeholder="닉네임을 정해주세요."
          />
          <button
            type="button"
            className="double-check"
            onClick={() => handleDuplicateCheck('nickname', watch('nickname'))}
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
