import React, { useEffect, useState } from 'react';
import '../styles/mypage/EditUserPage.scss';
import { ResignBtn } from '../components/MyPage/ResignBtn';
import { EditUserInfo } from '../components/MyPage/EditUserInfo';
import { getJwtFromCookies } from '../utils/extractUserIdFromCookie';
import { formatDate } from '../utils/formatDate';
import { getUser } from '../api/user';

export default function EditUserPage() {
  const [userInfo, setUserInfo] = useState<any>(null); // 유저 정보를 저장할 상태
  const [isUpdated, setIsUpdated] = useState(false);

  // 업데이트 상태를 변경하는 함수
  const handleUpdate = () => {
    setIsUpdated((prev) => !prev);
  };

  useEffect(() => {
    const userIdFromCookie = getJwtFromCookies(); //쿠키에 값 있으면
    if (userIdFromCookie) {
      fetchUserInfo();
    }
  }, []);

  // userInfo가 설정되거나, isUpdated가 변경될 때 fetchUserInfo 실행
  useEffect(() => {
    if (userInfo) {
      fetchUserInfo();
    }
  }, [isUpdated]);

  const fetchUserInfo = async () => {
    try {
      const response = await getUser();
      setUserInfo(response.data.data);
    } catch (error) {
      console.error('유저 정보를 불러오는 중 오류 발생:', error);
    }
  };

  return (
    <section id="edit-user">
      <h2 className="title">내정보</h2>
      <div className="profile">
        <div className="img-wrap">
          <figure>
            {userInfo ? (
              <img
                src={userInfo.profileImg || '/images/usericon.png'}
                alt="프로필 이미지"
                className="profile-image"
              />
            ) : (
              <div className="placeholder">로딩 중...</div>
            )}
          </figure>
        </div>
        <div className="profile-details">
          <p className="createat">
            가입일자 :{' '}
            <span>
              {userInfo?.createdAt
                ? formatDate(userInfo.createdAt)
                : '정보 없음'}
            </span>
          </p>
          <p>
            <label htmlFor="">ID</label>
            <input
              type="text"
              disabled
              placeholder={userInfo?.loginId || '로딩 중...'}
            />
          </p>
          <p>
            <label htmlFor="">Email</label>
            <input
              type="text"
              disabled
              placeholder={userInfo?.email || '로딩 중...'}
            />
          </p>
          <p>
            <label htmlFor="">Tel</label>
            <input
              type="tel"
              disabled
              placeholder={userInfo?.phoneNum || '로딩 중...'}
            />
          </p>
          <p className="noti-txt">아이디와 이메일은 변경할 수 없습니다. 😢</p>
        </div>
      </div>
      <EditUserInfo onUpdate={handleUpdate} />
      <ResignBtn />
    </section>
  );
}
