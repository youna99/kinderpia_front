import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

interface EditMyInfoBtnProps {
  userId: string | null;
}

//200 확인, 에러: 401 비밀번호 불일치, 400 유효성검사
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
          return false; // 비밀번호가 없으면 false 반환
        } else if (!passwordRegex.test(password)) {
          Swal.showValidationMessage(
            '설정하신 비밀번호는 8~16자 영문, 숫자를 포함합니다.'
          );
          return false; // 정규식 검사 실패 시 false 반환
        } else {
          // 비밀번호 확인 API 호출
          try {
            const response = await axios.post(
              'http://localhost:8080/api/user/check/userpw',
              {
                userId: userId,
                userPw: password,
              },
              { withCredentials: true }
            );

            // 응답 상태 코드에 따라 처리
            if (response.data.status === 200) {
              return password; // 비밀번호가 일치하면 password 반환
            }
          } catch (error) {
            const axiosError = error as AxiosError; // error를 AxiosError로 타입 단언
            if (axiosError.response) {
              // 상태 코드 확인
              if (axiosError.response.status === 401) {
                Swal.showValidationMessage('비밀번호가 일치하지 않습니다.');
              } else if (axiosError.response.status === 404) {
                Swal.showValidationMessage('사용자를 찾을 수 없습니다.');
              } else {
                Swal.showValidationMessage(
                  '비밀번호 확인 중 오류가 발생했습니다.'
                );
              }
            } else {
              Swal.showValidationMessage('네트워크 오류가 발생했습니다.');
            }
            return false; // 오류 발생 시 false 반환
          }
        }
      },
    });

    if (password) {
      await Swal.fire(
        '비밀번호가 확인되었습니다. 내 정보 수정 페이지로 이동합니다.'
      );
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
