import React, { useState } from 'react';
import RegisterInput from '../../components/FormInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { simpleAlert } from '../../utils/alert';
import { useNavigate } from 'react-router-dom';

interface EditUserFormProps {
  userPw?: string;
  pwCheck?: string;
  phoneNum?: string;
}

interface EditUserInfoProps {
  userId: string | null;
  onUpdate: () => void; // onUpdate prop 추가
}

export const EditUserInfo = ({ userId, onUpdate }: EditUserInfoProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIconClass, setEyeIconClass] = useState('xi-eye');
  const [isPhoneNumChecked, setIsPhoneNumChecked] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    reset,
  } = useForm<EditUserFormProps>({
    mode: 'onChange',
    defaultValues: {
      userPw: '',
      pwCheck: '',
      phoneNum: '',
    },
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
        'http://localhost:8080/api/user/check/phoneNum',
        {
          phoneNum,
        },
        { withCredentials: true }
      );

      if (response.data.data === false) {
        setError('phoneNum', {
          type: 'manual',
          message: response.data.message,
        });
        if (phoneNum) {
          setIsPhoneNumChecked(true);
        }
      }
    } catch (error: any) {
      const status = error.response?.data.status;
      const message = error.response?.data.message;
      if (status === 409 || status === 400) {
        setError('phoneNum', { type: 'manual', message });
      }
      setIsPhoneNumChecked(false); // 예외 발생 시 중복으로 간주
    }
  };

  // 회원정보 수정 폼 전송
  const onSubmit: SubmitHandler<EditUserFormProps> = async (data) => {
    const { userPw, pwCheck, phoneNum } = data;

    if (phoneNum && !isPhoneNumChecked) {
      setError('phoneNum', {
        type: 'manual',
        message: '전화번호 중복 검사를 완료해주세요.',
      });
      return;
    }

    if (userPw && userPw !== pwCheck) {
      setError('pwCheck', {
        type: 'manual',
        message: '비밀번호가 일치하지 않습니다.',
      });
      return;
    }

    const updateData: any = {};
    if (phoneNum) updateData.phoneNum = phoneNum;
    if (userPw) updateData.userPw = userPw;

    try {
      const response = await axios.put(
        `http://localhost:8080/api/user/${userId}`,
        updateData
      );
      if (response.status === 200) {
        simpleAlert('success', '정보가 수정되었습니다.');
        reset();
        onUpdate(); //부모 컴포넌트의 상태 업데이트
        navigate('/mypage/editUser');
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
            regexMessage="전화번호는 10~11자리 숫자여야 합니다."
            placeholder="‘-’없이 숫자만 입력"
            onBlur={() => {
              const phoneNum = watch('phoneNum');
              if (phoneNum) checkDuplicatePhoneNum(phoneNum);
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
