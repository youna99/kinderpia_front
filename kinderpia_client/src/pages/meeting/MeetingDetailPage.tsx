import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// 데이터 호출 - 더미데이터, api
import { dummyMeetings } from '../../data/tempMeetingDetailData';
import { dummyMeetingUser1, dummyMeetingUser2, dummyMeetingUser3 } from '../../data/tempMeetingDetailUserData';

//스타일 호출
import '../../styles/meeting/detailpage/MeetingDetailPage.scss';

// 컴포넌트 호출
import MeetingInfo from '../../components/meeting/detailpage/MeetingInfo';
import MeetingAction from '../../components/meeting/detailpage/MeetingAction';

// 타입 호출
import { MeetingData, MeetingUserData } from '../../types/meeting';

function MeetingDetailPage() {
  
  const { meetingId } = useParams<{ meetingId: string }>();
  const [ meetingData, setMeetingData] = useState<MeetingData>();
  const [ userData, setUserData ] = useState<MeetingUserData>();
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    if (!meetingId) return;
    
    console.log('현재 접근한 장소 ID:', meetingId);
    setIsLoading(true);
    
    const data = dummyMeetings[ Number(meetingId)-1 ];
    try {
      setMeetingData(data);
      setUserData(dummyMeetingUser1);
    } catch (error) {
      console.error('Error fetching place data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [meetingId]);

  if (!meetingId) {
    return <div>낫 타당한 접근방법! </div>;
  }

  if (isLoading) {
    return <div>로딩중이여요!</div>;
  }

  if (!meetingId) {
    return <div>데이터가 없습니다 ㅠ</div>;
  }

  return (
    <div className='meeting-detail-page'>
      <MeetingInfo
        data={meetingData}
        user={userData}
      />
      <MeetingAction
        data={userData}
      />
    </div>
  )
}

export default MeetingDetailPage;