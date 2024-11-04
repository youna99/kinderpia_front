import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
import { getMeeting } from '../../api/meeting';

function MeetingDetailPage() {
  const navigate = useNavigate();
  
  const { meetingId } = useParams<{ meetingId: string }>();
  const [ meetingData, setMeetingData] = useState<MeetingData>();
  const [ userData, setUserData ] = useState<MeetingUserData>();
  const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    if (!meetingId) return;
    
    setIsLoading(true);
    
    const data = dummyMeetings[ Number(meetingId)-1 ];
    try {
      setMeetingData(data);

      const result = getMeeting( Number(meetingId) );

      console.log(result);
      
      setUserData(dummyMeetingUser2);
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