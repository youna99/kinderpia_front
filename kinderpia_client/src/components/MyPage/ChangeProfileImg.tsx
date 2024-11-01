import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

interface ChangeProfileImgProps {
  profileImg: string;
  userId: number;
}

export const ChangeProfileImg: React.FC<ChangeProfileImgProps> = ({
  profileImg,
  userId,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    profileImg || null
  );

  const handleImageChange = async () => {
    const { value: file } = await Swal.fire({
      title: '사진을 선택해주세요.',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Upload your profile picture',
      },
    });

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageUrl = e.target?.result;

        if (typeof imageUrl === 'string') {
          Swal.fire({
            icon: 'success',
            showConfirmButton: false,
            title: '프로필 변경 완료!',
            timer: 1500,
          });

          setSelectedImage(imageUrl);

          // 파일 업로드
          const formData = new FormData();
          formData.append('profileImage', file);

          // try {
          //   const response = await axios.post(`/api/user/${userId}`, formData, {
          //     headers: {
          //       'Content-Type': 'multipart/form-data',
          //     },
          //   });
          //   console.log('이미지 업로드 성공:', response.data);
          //   Swal.fire('프로필을 수정했습니다.');
          // } catch (error) {
          //   console.error('이미지 업로드 실패:', error);
          //   Swal.fire('이미지 업로드에 실패했습니다.');
          // }
        } else {
          Swal.fire('이미지 미리보기를 가져오는 데 실패했습니다.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form action="#" id="profileImgForm" onSubmit={(e) => e.preventDefault()}>
      <figure>
        <img
          src={selectedImage || '/images/usericon.png'}
          alt="프로필 이미지"
          className="profile-image"
        />
      </figure>
      <button
        type="button"
        onClick={handleImageChange}
        title="프로필 사진 변경하기"
      >
        <span className="xi-camera change-img-btn"></span>
      </button>
    </form>
  );
};
