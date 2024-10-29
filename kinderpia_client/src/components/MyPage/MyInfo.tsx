import React from 'react';
import '../../styles/mypage/MyInfo.scss';
import { Link } from 'react-router-dom';
import ScheduleCalender from './ScheduleCalender';

const MyInfo: React.FC = () => {
  const profileData = {
    profileImage: '/images/usericon.png',
    nickname: '사용자닉네임저쩌고',
  };

  return (
    <section className="my-info">
      <div className="profile">
        <img
          src={profileData.profileImage}
          alt="프로필 이미지"
          className="profile-image"
        />
        <div className="profile-details">
          <strong className="nickname">{profileData.nickname}</strong>
          <Link to={'/mypage/editUser'} className="my-info-edit">
            내 정보 수정
          </Link>
        </div>
      </div>
      <ScheduleCalender />
    </section>
  );
};

export default MyInfo;
