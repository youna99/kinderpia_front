import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { requestHeader } from '../../api/requestHeader';

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
        } else if (!nicknameRegex.test(nickname)) {
          Swal.showValidationMessage(
            '닉네임은 2~15자의 한글, 영문, 숫자만 사용 가능합니다.'
          );
        } else {
          // 닉네임 중복 체크
          // try {
          //   const response = await requestHeader.post(
          //     '/api/user/check/nickname',
          //     {
          //       nickname: nickname,
          //     }
          //   );
          //   if (response.data.exists) {
          //     // Error(409:이미 사용 중인 닉네임입니다./400:유효성 검사)
          //     Swal.showValidationMessage('해당 닉네임이 이미 있습니다.');
          //   }
          // } catch (error) {
          //   Swal.showValidationMessage('닉네임 중복 체크에 실패했습니다.');
          // }
        }
        return nickname;
      },
    });

    if (inputNickname) {
      setNewNickname(inputNickname);
      await updateNickname(inputNickname);
    }
  };

  const updateNickname = async (nickname: string) => {
    // try {
    //   const response = await requestHeader.put(`/api/user/${userId}`, {
    //     nickname: nickname,
    //   });
    //   if (response.status === 200) {
    //     Swal.fire('닉네임이 수정되었습니다.');
    //   }
    // } catch (error) {
    //   console.error('닉네임 업데이트에 실패했습니다:', error);
    //   Swal.fire('닉네임 업데이트에 실패했습니다. 다시 시도해주세요.');
    // }
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
