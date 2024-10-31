import React from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface EditMyInfoBtnProps {
  userId: number;
}

export const EditMyInfoBtn: React.FC<EditMyInfoBtnProps> = ({ userId }) => {
  const navigate = useNavigate();
  const handleEditClick = async () => {
    const { value: password } = await Swal.fire({
      title: '비밀번호 확인',
      input: 'password',
      inputLabel: '비밀번호를 입력해주세요.',
      inputPlaceholder: 'password',
      inputAttributes: {
        maxlength: '16',
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      preConfirm: async (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,16}$/;
        if (!password) {
          Swal.showValidationMessage('비밀번호를 입력하세요.');
        } else if (!passwordRegex.test(password)) {
          Swal.showValidationMessage(
            '설정하신 비밀번호는 8~16자 영문, 숫자를 포함합니다.'
          );
        } else {
          // 비밀번호 확인 API 호출
          // try {
          //   const response = await axios.post('/api/user/check/userpw', {
          //     userId: userId,
          //     password: password,
          //   });
          //   if (!response.data.match) {
          //     Swal.showValidationMessage('비밀번호가 일치하지 않습니다.');
          //   }
          // } catch (error) {
          //   Swal.showValidationMessage('비밀번호 확인 중 오류가 발생했습니다.');
          // }
        }
        return password;
      },
    });

    if (password) {
      Swal.fire('비밀번호가 확인되었습니다. 내 정보 수정 페이지로 이동합니다.');
      navigate('/mypage/editUser');
    }
  };

  return (
    <>
      <button type="button" className="my-info-edit" onClick={handleEditClick}>
        내 정보 수정
      </button>
    </>
  );
};
