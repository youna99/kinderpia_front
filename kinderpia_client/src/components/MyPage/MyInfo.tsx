import React from 'react';
import '../../styles/mypage/MyInfo.scss';
import ScheduleCalender from './ScheduleCalender';
import { ChangeProfileImg } from './ChangeProfileImg';
import { EditNickName } from './EditNickName';
import { EditMyInfoBtn } from './EditMyInfoBtn';

const MyInfo: React.FC = () => {
  const profileData = {
    user_id: 12,
    login_id: 'test1',
    user_pw: 'test1',
    email: 'test1@gmail.com',
    phone_num: '01012345678',
    is_blacklist: 'false',
    is_deleted: 'false',
    profile_img: '/images/usericon.png',
    nickname: '사용자닉네임저쩌고라라라라라저',
  };

  return (
    <section className="my-info">
      <div className="profile">
        {/* 프로필 수정 컴포넌트 */}
        <ChangeProfileImg
          profileImg={profileData.profile_img}
          userId={profileData.user_id}
        />
        <div className="profile-details">
          {/* 닉네임 수정 컴포넌트 */}
          <EditNickName
            nickname={profileData.nickname}
            userId={profileData.user_id}
          />
        </div>
        {/* 내 정보 수정 버튼 컴포넌트 */}
        <EditMyInfoBtn userId={profileData.user_id} />
      </div>
      {/* 모임 캘린더 컴포넌트 */}
      <ScheduleCalender />
    </section>
  );
};

export default MyInfo;
