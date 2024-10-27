import React from 'react';
import { useForm } from 'react-hook-form';

interface RegisterFormInputs {
  userId: string;
  userPw: string;
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
  return (
    <div>
      <h2 className="title">회원가입</h2>
      <p>킨더피아 멤버가 되어보세요.</p>
      <form action="#" id="register">
        <div className="register-input">
          <label htmlFor="userId">아이디</label>
          <input
            type="text"
            id="userId"
            placeholder="6~12글자, 영어 소문자/숫자 조합"
            {...register('userId', {
              required: '아이디를 입력해주세요.',
              pattern: {
                message:
                  '아이디는 영어, 소문자, 숫자로 6-12 자 사이여야 합니다.',
                value: /^[a-z0-9]{6,12}$/,
              },
            })}
          />
          <button>중복확인</button>
          <span className="error-msg">{errors.userId?.message}</span>
        </div>
        <div>
          <label htmlFor="userPw" className="label">
            비밀번호
          </label>
          <input
            type="password"
            id="userPw"
            placeholder="8~16글자, 영어/숫자 조합, 특수문자 가능"
          />
          <input type="password" />
        </div>
      </form>
    </div>
  );
}
