import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios, { AxiosError } from 'axios';

interface EditNickNameProps {
  nickname: string;
  userId: number;
}

export const EditNickName: React.FC<EditNickNameProps> = ({
  nickname,
  userId,
}) => {
  const [newNickname, setNewNickname] = useState(nickname);
  const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,15}$/;

  const handleEditClick = async () => {
    const { value: inputNickname } = await Swal.fire({
      title: '닉네임 수정',
      input: 'text',
      inputLabel: '새로운 닉네임을 입력하세요',
      inputPlaceholder: '닉네임',
      inputValue: '',
      showCancelButton: true,
      confirmButtonText: '저장',
      cancelButtonText: '취소',
      inputAttributes: {
        'aria-label': '닉네임 입력',
      },
      preConfirm: async (nickname) => {
        if (!nickname) {
          Swal.showValidationMessage('닉네임을 입력하세요.');
          return false; // 입력이 없으면 false 반환
        } else if (!nicknameRegex.test(nickname)) {
          Swal.showValidationMessage(
            '닉네임은 2~15자의 한글, 영문, 숫자만 사용 가능합니다.'
          );
          return false; // 정규식 검사 실패 시 false 반환
        } else {
          // 닉네임 중복 체크
          try {
            const response = await axios.post(
              'http://localhost:8080/api/user/check/nickname',
              {
                nickname: nickname,
              }
            );

            if (response.data.exists) {
              Swal.showValidationMessage('해당 닉네임이 이미 있습니다.');
              return false; // 중복일 경우 false 반환
            }
          } catch (error) {
            const axiosError = error as AxiosError; // error를 AxiosError로 타입 단언
            if (axiosError.response) {
              // 400 또는 409 오류 처리
              if (axiosError.response.status === 409) {
                Swal.showValidationMessage('이미 사용 중인 닉네임입니다.');
              } else if (axiosError.response.status === 400) {
                Swal.showValidationMessage('유효성 검사에 실패했습니다.');
              } else {
                Swal.showValidationMessage('닉네임 중복 체크에 실패했습니다.');
              }
            } else {
              Swal.showValidationMessage('네트워크 오류가 발생했습니다.');
            }
            return false; // 오류 발생 시 false 반환
          }
        }
        return nickname; // 모든 검사를 통과한 경우 nickname 반환
      },
    });

    if (inputNickname) {
      setNewNickname(inputNickname);
      await updateNickname(inputNickname);
    }
  };
  const updateNickname = async (nickname: string) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/user/${userId}`,
        {
          nickname: nickname,
        },
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        Swal.fire('닉네임이 수정되었습니다.');
      }
    } catch (error) {
      console.error('닉네임 업데이트에 실패했습니다:', error);
      Swal.fire('닉네임 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <form action="#" id="editNicknameForm">
      <strong className="nickname">{newNickname}</strong>
      <button
        type="button"
        className="xi-pen nickname-edit-icon"
        onClick={handleEditClick}
        title="닉네임 변경하기"
      ></button>
    </form>
  );
};
