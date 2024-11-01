import React from 'react';
import '../../styles/mypage/MyInfo.scss';
import ScheduleCalender from './ScheduleCalender';
import { ChangeProfileImg } from './ChangeProfileImg';
import { EditNickName } from './EditNickName';
import { EditMyInfoBtn } from './EditMyInfoBtn';

const MyInfo: React.FC = () => {
  const profileData = {
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

  return (
    <section className="my-info">
      <div className="profile">
        {/* 프로필 수정 컴포넌트 */}
        <ChangeProfileImg
          profileImg={profileData.profileImg}
          userId={profileData.userId}
        />
        <div className="profile-details">
          {/* 닉네임 수정 컴포넌트 */}
          <EditNickName
            nickname={profileData.nickname}
            userId={profileData.userId}
          />
        </div>
        {/* 내 정보 수정 버튼 컴포넌트 */}
        <EditMyInfoBtn userId={profileData.userId} />
      </div>
      {/* 모임 캘린더 컴포넌트 */}
      <ScheduleCalender userId={profileData.userId} />
    </section>
  );
};

export default MyInfo;
