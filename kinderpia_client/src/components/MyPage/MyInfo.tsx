import React from 'react';
import '../../styles/mypage/MyInfo.scss';
import ScheduleCalender from './ScheduleCalender';
import { ChangeProfileImg } from './ChangeProfileImg';
import { EditNickName } from './EditNickName';
import { EditMyInfoBtn } from './EditMyInfoBtn';

interface MyInfoProps {
  userInfo: {
    userId: string | null;
    profileImg?: string; // 프로필 이미지가 선택적임을 나타냄
    nickname?: string; // 닉네임이 선택적임을 나타냄
  } | null; // userInfo가 null일 수 있음을 명시
}

const MyInfo: React.FC<MyInfoProps> = ({ userInfo }) => {
  const profileImg = userInfo?.profileImg || '/images/usericon.png';
  const nickname = userInfo?.nickname || '사용자 이름 없음';

  return (
    <section className="my-info">
      <div className="profile">
        {/* 프로필 수정 컴포넌트 */}
        <ChangeProfileImg profileImg={profileImg} />
        <div className="profile-details">
          {/* 닉네임 수정 컴포넌트 */}
          <EditNickName nickname={nickname} />
        </div>
        {/* 내 정보 수정 버튼 컴포넌트 */}
        <EditMyInfoBtn />
      </div>
      {/* 모임 캘린더 컴포넌트 */}
      <ScheduleCalender />
    </section>
  );
};

export default MyInfo;
