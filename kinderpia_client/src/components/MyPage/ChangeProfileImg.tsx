import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { simpleAlert } from '../../utils/alert';

interface ChangeProfileImgProps {
  profileImg: string;
}

export const ChangeProfileImg: React.FC<ChangeProfileImgProps> = ({
  profileImg,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    profileImg || null
  );

  useEffect(() => {
    setSelectedImage(profileImg);
  }, [profileImg]);

  const handleImageChange = async () => {
    const { value: file } = await Swal.fire({
      title: '사진을 선택해주세요.',
      input: 'file',
      inputAttributes: {
        accept: 'image/jpeg, image/png',
        'aria-label': 'Upload your profile picture',
      },
    });

    if (file) {
      // 파일 크기 제한 (예: 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        Swal.fire({
          icon: 'error',
          title: '파일 크기가 너무 큽니다.',
          text: '2MB 이하의 이미지를 선택해주세요.',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageUrl = e.target?.result;
        if (typeof imageUrl === 'string') {
          setSelectedImage(imageUrl);

          // 파일 업로드
          const formData = new FormData();
          formData.append('image', file);

          try {
            const response = await axios.put(
              `${process.env.REACT_APP_API_URL}/api/user/profileImg`,
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Accept: 'application/json',
                },
                withCredentials: true,
              }
            );
            console.log('이미지 업로드 성공:', response.data);
            simpleAlert('success', '프로필을 수정했습니다.');
          } catch (error) {
            console.error('이미지 업로드 실패:', error);
            simpleAlert('error', '이미지 업로드 중 오류가 생겼습니다.');
          }
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
        <i className="xi-camera change-img-btn"></i>
      </button>
    </form>
  );
};
