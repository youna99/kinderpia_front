import React, { useState } from 'react';
import '../styles/mypage/EditUserPage.scss';
import RegisterInput from '../components/FormInput';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { simpleAlert } from '../utils/alert';
import { ResignBtn } from '../components/MyPage/ResignBtn';
import { requestHeader } from '../api/requestHeader';
interface EditUserFormProps {
  userPw: string;
  pwCheck: string;
  phoneNum: string;
}

export default function EditUserPage() {
  const userData = {
    userId: 12,
    loginId: 'test1',
    userPw: 'test1',
    email: 'test1@gmail.com',
    phoneNum: '01012345678',
    isBlacklist: 'false',
    isDeleted: 'false',
    profileImg: '/images/usericon.png',
    nickname: '사용자닉네임저쩌고라라라라라저',
  };

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
  const clearInput = (field: 'userPw' | 'pwCheck' | 'phoneNum') => {
    setValue(field, '');
  };

  const checkDuplicatePhoneNum = async (phoneNum: string) => {
    try {
      const response = await requestHeader.post('/api/user/check/phonenum', {
        phoneNum,
      });
      return response.data.isDuplicate; // true or false
    } catch (error) {
      console.error('중복 확인 오류:', error);
      return true; // 예외 발생 시 중복으로 간주
    }
  };

  const onSubmit: SubmitHandler<EditUserFormProps> = async (data) => {
    const { userPw, phoneNum } = data;

    // 비밀번호와 전화번호 수정 API 호출
    try {
      const response = await requestHeader.put(`/api/user/${userData.userId}`, {
        userPw,
        phoneNum,
      });

      if (response.status === 200) {
        simpleAlert('success', '정보가 수정되었습니다.');
        navigate('/mypage'); // 수정 후 마이페이지로 이동
      }
    } catch (error) {
      console.error('수정 오류:', error);
      alert('정보 수정 중 오류가 발생했습니다.');
    }
  };

  return (
    <section id="edit-user">
      <h2 className="title">내정보</h2>
      <div className="profile">
        <div className="img-wrap">
          <figure>
            <img
              src={userData.profileImg}
              alt="프로필 이미지"
              className="profile-image"
            />
          </figure>
        </div>
        <div className="profile-details">
          <p className="createat">
            가입일자 : <span>2024.10.31</span>
          </p>
          <p>
            <label htmlFor="">ID</label>
            <input type="text" disabled placeholder={userData.loginId} />
          </p>
          <p>
            <label htmlFor="">Email</label>
            <input type="text" disabled placeholder={userData.email} />
          </p>
          <p>
            <label htmlFor="">Tel</label>
            <input type="tel" disabled placeholder={userData.phoneNum} />
          </p>
          <p className="noti-txt">아이디와 이메일은 변경할 수 없습니다. 😢</p>
        </div>
      </div>
      <h2 className="title">내 정보 수정</h2>
      <form action="#" id="edit-user-form" onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit" className="edit-submit-btn">
          정보 수정
        </button>
      </form>
      <ResignBtn userId={userData.userId} />
    </section>
  );
}
