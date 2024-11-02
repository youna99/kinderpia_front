import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios, { AxiosError } from 'axios';
import { confirmAlert } from '../../utils/alert';

export const ResignBtn = ({ userId }: { userId: string | null }) => {
  const navigate = useNavigate();

  const handleResignClick = async () => {
    const confirmResign = await confirmAlert(
      'warning',
      '정말 탈퇴하시겠습니까? 😭',
      '🚫 탈퇴 후에는 정보를 복구할 수 없습니다.'
    );

    if (confirmResign) {
      const { value: password } = await Swal.fire({
        title: '비밀번호 확인',
        input: 'password',
        inputLabel: '본인 확인이 필요합니다.',
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
            return false; // 비밀번호가 없으므로 false 반환
          } else if (!passwordRegex.test(password)) {
            Swal.showValidationMessage('비밀번호 형식이 맞지 않습니다.');
            return false; // 비밀번호 형식이 맞지 않으므로 false 반환
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
          return true; // 모든 검사를 통과했으므로 true 반환
        },
      });

      if (password) {
        // 비밀번호가 확인되면 탈퇴 API 호출
        try {
          const response = await axios.patch(
            `http://localhost:8080/api/user/logical/${userId}`,
            { withCredentials: true }
          );
          if (response.status === 200) {
            Swal.fire('탈퇴가 완료되었습니다.', '감사합니다.', 'success');
            navigate('/'); // 탈퇴 후 홈으로 이동
          }
        } catch (error) {
          Swal.fire('탈퇴 처리 중 오류가 발생했습니다.', '', 'error');
        }
      }
    }
  };

  return (
    <>
      <button className="resign-btn" onClick={handleResignClick}>
        탈퇴하기
      </button>
    </>
  );
};
