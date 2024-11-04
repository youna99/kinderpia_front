import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 데이터 호출 - 더미데이터, api
import { dummyMeetingUser1, dummyMeetingUser2, dummyMeetingUser3 } from '../../data/tempMeetingDetailUserData';

//스타일 호출
import '../../styles/meeting/detailpage/MeetingDetailPage.scss';

// 컴포넌트 호출
import MeetingInfo from '../../components/meeting/detailpage/MeetingInfo';
import MeetingAction from '../../components/meeting/detailpage/MeetingAction';

// 타입 호출
import { MeetingData, MeetingDetailData, MeetingUserData } from '../../types/meeting';
import { getMeeting } from '../../api/meeting';

function MeetingDetailPage() {
  const navigate = useNavigate();
  const { meetingId } = useParams<{ meetingId: string }>();
  
  // 초기 상태를 null로 설정하여 데이터 로딩 상태를 명확히 함
  const [meetingData, setMeetingData] = useState<MeetingData>();
  const [userData, setUserData] = useState<MeetingUserData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!meetingId) return;
    
    const fetchMeetingData = async () => {
      setIsLoading(true);
      
      try {
        const response = await getMeeting(Number(meetingId));
        console.log('API Response:', response);

        if (response) {
          const result = response;
          
          const formattedResults: MeetingData = {
            meetingId: result.meetingId,
            meetingTitle: result.meetingTitle,
            detailAddress :result.detailAddress,
            meetingCategory: result.meetingCategory,
            participants: result.capacity,
            totalCapacity: result.totalCapacity,
            nickname: result.nickname,
            meetingLocation: result.meetingLocation,
            meetingTime: result.meetingTime,
            meetingContent: result.meetingContent,
            authType: result.authType,
            meetingStatus: result.meetingStatus,
            createdAt: result.createdAt,
          };
          
          console.log('Formatted Results:', formattedResults);
          setMeetingData(formattedResults);
          setUserData(dummyMeetingUser2);
        }

      } catch (error) {
        console.error('Error fetching meeting data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeetingData();
  }, [meetingId]);


  if (!meetingId) {
    return <div>낫 타당한 접근방법! </div>;
  }

  if (isLoading) {
    return <div>로딩중이여요!</div>;
  }

  if (!meetingId) {
    // navigate('/not-found', { replace: true });
    return null;
  }

  return (
    <div className='meeting-detail-page'>
      <MeetingInfo
        data={meetingData}
        user={userData}
      />
      <hr/>
      <MeetingAction
        user={userData}
        data={meetingData}
      />
    </div>
  )
}

export default MeetingDetailPage;