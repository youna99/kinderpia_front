import React, { useState } from 'react';
import RegisterInput from '../../components/FormInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { simpleAlert } from '../../utils/alert';
import { useNavigate } from 'react-router-dom';

interface EditUserFormProps {
  userPw: string;
  pwCheck: string;
  phoneNum: string;
}

export const EditUserInfo = ({ userId }: { userId: string | null }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIconClass, setEyeIconClass] = useState('xi-eye');
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm<EditUserFormProps>({
    mode: 'onChange',
  });

  // 비밀번호 보이기/안보이기 아이콘 토글
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => {
      const newShowPassword = !prev;
      setEyeIconClass(newShowPassword ? 'xi-eye-off' : 'xi-eye');
      return newShowPassword;
    });
  };

  // 인풋창 지우기 함수
  const clearInput = (field: 'userPw' | 'pwCheck' | 'phoneNum') => {
    setValue(field, '');
  };

  // 전화번호 중복확인
  const checkDuplicatePhoneNum = async (phoneNum: string) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/user/check/phonenum',
        {
          phoneNum,
        }
      );
      return response.data.isDuplicate; // true or false
    } catch (error) {
      console.error('중복 확인 오류:', error);
      return true; // 예외 발생 시 중복으로 간주
    }
  };

  // 회원정보 수정 폼 전송
  const onSubmit: SubmitHandler<EditUserFormProps> = async (data) => {
    const { userPw, phoneNum } = data;
    // 비밀번호와 전화번호 수정 API 호출
    try {
      const response = await axios.put(
        `http://localhost:8080/api/user/${userId}`,
        {
          userPw,
          phoneNum,
        }
      );
      if (response.status === 200) {
        simpleAlert('success', '정보가 수정되었습니다.');
        navigate('/mypage/editUser'); // 수정 후 마이페이지로 이동
      }
    } catch (error) {
      console.error('수정 오류:', error);
      alert('정보 수정 중 오류가 발생했습니다.');
    }
  };
  return (
    <>
      <h2 className="title">내 정보 수정</h2>
      <form action="#" id="edit-user-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-box">
          <RegisterInput
            label="전화번호"
            type="number"
            id="phoneNum"
            register={register}
            clearInput={() => clearInput('phoneNum')}
            error={errors.phoneNum?.message}
            regex={/^[0-9]{10,11}$/}
            regexMessage="전화번호는 0-9의 숫자로 10자리 또는 11자리 숫자로만 이루어져야 합니다."
            placeholder="‘-’없이 숫자만 입력"
            onBlur={async () => {
              const phoneNum = watch('phoneNum');
              if (phoneNum) {
                const isDuplicate = await checkDuplicatePhoneNum(phoneNum);
                if (isDuplicate) {
                  setError('phoneNum', {
                    type: 'manual',
                    message: '전화번호가 이미 사용 중입니다.',
                  });
                } else {
                  setError('phoneNum', { type: 'manual', message: '' });
                }
              }
            }}
          />
        </div>
        <div className="input-box">
          <RegisterInput
            label="비밀번호"
            type={showPassword ? 'text' : 'password'}
            id="userPw"
            register={register}
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
        <button type="submit" className="edit-submit-btn">
          정보 수정
        </button>
      </form>
    </>
  );
};
