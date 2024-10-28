import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import RegisterInput from '../components/FormInput';
import '../styles/RegisterPage.scss';

interface RegisterFormInputs {
  userId: string;
  userPw: string;
  pwCheck: string;
  nickName: string;
  email: string;
  phoneNum: string;
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
    mode: 'onBlur',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [eyeIconClass, setEyeIconClass] = useState('xi-eye');

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => {
      const newShowPassword = !prev;
      setEyeIconClass(newShowPassword ? 'xi-eye-off' : 'xi-eye');
      return newShowPassword;
    });
  };

  const clearInput = (
    field: 'userId' | 'userPw' | 'pwCheck' | 'nickName' | 'email' | 'phoneNum'
  ) => {
    setValue(field, '');
  };

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    console.log('회원가입 데이터:', data);
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
            placeholder="6~12글자, 영어 소문자/숫자 조합"
          />
          <button type="button" className="double-check">
            중복 확인
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
            placeholder="8~16글자, 영어/숫자 조합, 특수문자 가능"
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
            placeholder="8~16글자, 영어/숫자 조합, 특수문자 가능"
          />
        </div>
        <div className="input-box">
          <RegisterInput
            label="닉네임"
            type={showPassword ? 'text' : 'password'}
            id="nickName"
            register={register}
            requiredMessage="닉네임을 입력해주세요."
            clearInput={() => clearInput('nickName')}
            error={errors.nickName?.message}
            regex={/^[가-힣a-zA-Z0-9]{2,15}$/}
            regexMessage="닉네임은 한글, 영어, 숫자로 2-15자 사이여야 합니다."
            placeholder="2~15글자, 한글/영어/숫자 가능"
          />
          <button type="button" className="double-check">
            중복 확인
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
            regexMessage="휴대전화번호는 0-9의 숫자로 10자리 또는 11자리 숫자로만 이루어져야 합니다."
            placeholder="‘-’없이 숫자만 입력"
          />
        </div>
        <div className="input-box">
          <div className="agree-wrap">
            <label htmlFor="agree" id="agree">
              약관 동의
            </label>
            <div>
              <input type="checkbox" name="agree" id="all-check" />
              <label htmlFor="all-check">전체동의하기</label>
            </div>
            <div>
              <input type="checkbox" name="agree" id="check1" />
              <label htmlFor="check1">
                <span>&#91;필수&#93;</span>이용약관
              </label>
              <p>여러분 환영합니다. 어쩌고 저쩌고 약관</p>
            </div>
            <div>
              <input type="checkbox" name="agree" id="check2" />
              <label htmlFor="check2">
                <span>&#91;필수&#93;</span>개인정보 수집 및 이용
              </label>
              <p>여러분 환영합니다. 어쩌고 저쩌고 약관</p>
            </div>
          </div>
        </div>
        <button className="register-btn">회원가입</button>
      </form>
    </section>
  );
}
