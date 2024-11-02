import React, { useEffect, useState } from 'react';
import '../styles/mypage/EditUserPage.scss';
import { ResignBtn } from '../components/MyPage/ResignBtn';
import axios from 'axios';
import { EditUserInfo } from '../components/MyPage/EditUserInfo';

export default function EditUserPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null); // 유저 정보를 저장할 상태

  const extractUserIdFromToken = (token: string): string | null => {
    if (!token) return null;
    try {
      const tokenWithoutBearer = token.split(' ')[1];
      const payload = tokenWithoutBearer.split('.')[1];
      const decodedPayload = JSON.parse(atob(payload));
      return decodedPayload.sub;
    } catch (error) {
      console.error('토큰에서 사용자 ID 추출 중 오류 발생:', error);
      return null;
    }
  };

  const fetchUserInfo = async (userId: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/${userId}`,
        {
          withCredentials: true,
        }
      );
      setUserInfo(response.data.data);
    } catch (error) {
      console.error('유저 정보를 불러오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const userIdFromToken = extractUserIdFromToken(token);
      if (userIdFromToken) {
        setUserId(userIdFromToken);
        fetchUserInfo(userIdFromToken);
      }
    }
  }, []);

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
            가입일자 : <span>2024.10.31</span>
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
      <EditUserInfo userId={userId} />
      <ResignBtn userId={userId} />
    </section>
  );
}
