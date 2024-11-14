import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 데이터 호출 - 더미데이터, api

//스타일 호출
import '../../styles/meeting/detailpage/MeetingDetailPage.scss';

// 컴포넌트 호출
import MeetingInfo from '../../components/meeting/detailpage/MeetingInfo';
import MeetingAction from '../../components/meeting/detailpage/MeetingAction';

// 타입 호출
import {
  MeetingData,
  MeetingUserData,
} from '../../types/meeting';
import { getMeeting, getMeetingUser } from '../../api/meeting';
import { extractUserIdFromCookie } from '../../utils/extractUserIdFromCookie';

function MeetingDetailPage() {
  const { meetingId } = useParams<{ meetingId: string }>();

  // 초기 상태를 null로 설정하여 데이터 로딩 상태를 명확히 함
  const [meetingData, setMeetingData] = useState<MeetingData>();
  const [userData, setUserData] = useState<MeetingUserData>();
  const [isLoading, setIsLoading] = useState(true);
  const [partStatus, setParticipate] = useState(0);

  useEffect(() => {
    if (!meetingId) return;

    const fetchMeetingData = async () => {
      setIsLoading(true);
      const userId = Number(extractUserIdFromCookie());

      try {
        const response = await getMeeting(Number(meetingId));
        const userResponse = await getMeetingUser({
          userId,
          meetingId: Number(meetingId),
        });

        if (response) {
          const formattedResults: MeetingData = {
            meetingId: response.meetingId,
            chatroomId: response.chatroomId,
            meetingTitle: response.meetingTitle,
            detailAddress: response.detailAddress,
            meetingCategory: response.meetingCategory,
            participants: response.capacity,
            totalCapacity: response.totalCapacity,
            nickname: response.nickname,
            meetingLocation: response.meetingLocation,
            meetingTime: response.meetingTime,
            meetingContent: response.meetingContent,
            authType: response.authType,
            meetingStatus: response.meetingStatus,
            createdAt: response.createdAt,
            userId: response.userId,
            profileImg: response.profileImg,
          };
          setParticipate(formattedResults.participants);
          setMeetingData(formattedResults);
        }
        if (userResponse) {
          const formattedUserData: MeetingUserData = {
            userId: userResponse.data.userId,
            joined: userResponse.data.joined,
            accepted: userResponse.data.accepted,
            reported: userResponse.data.reported,
          };
          setUserData(formattedUserData);
        }
      } catch (error) {
        console.error('Error fetching meeting data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetingData();
  }, [meetingId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
      } catch (error) {
        console.error('Error fetching meeting data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const refreshUserData = async () => {
    const userId = Number(extractUserIdFromCookie());
    try {
      const userResponse = await getMeetingUser({
        userId,
        meetingId: Number(meetingId),
      });

      const formattedUserData: MeetingUserData = {
        userId: userResponse.data.userId,
        joined: userResponse.data.joined,
        accepted: userResponse.data.accepted,
        reported: userResponse.data.reported,
      };

      setUserData(formattedUserData);
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  const participateObserver = (p: number, add: number) => {
    setParticipate(p + add);
  };

  if (!meetingId) {
    return <div>낫 타당한 접근방법! </div>;
  }

  if (isLoading) {
    return <div>로딩중이여요!</div>;
  }

  if (!meetingId) {
    return <i className="xi-spinner-1"></i>;
  }

  return (
    <section className="meeting-detail-page">
      <MeetingInfo
        user={userData}
        data={meetingData}
        people={partStatus}
        observer={participateObserver}
      />
      <hr />
      <MeetingAction
        user={userData}
        data={meetingData}
        onActionComplete={refreshUserData}
        observer={participateObserver}
      />
    </section>
  );
}

export default MeetingDetailPage;
