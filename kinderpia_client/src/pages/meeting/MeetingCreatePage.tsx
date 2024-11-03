import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // import 추가

// type 호출
import { CreateMeetingFormData } from '../../types/meeting';

// component 호출 - 모임
import TitleInput from '../../components/meeting/createpage/TitleInput';
import ParticipateInput from '../../components/meeting/createpage/ParticipateInput';
import DescInput from '../../components/meeting/createpage/DescInput';
import CategoryInput from '../../components/meeting/createpage/CategoryInput';
import JoinMethodInput from '../../components/meeting/createpage/JoinMethodInput';

// component 호출 - 공용
import MapSelector from '../../components/common/MapSelector';
import CalenderSelector from '../../components/common/CalanderSelector';
import CommonButton1 from '../../components/common/CommonButton1';

// api 요청 함수 호출
import { meetingApi } from '../../api/meeting';

//style 호출
import '../../styles/meeting/createpage/MeetingCreatePage.scss'
import { extractUserIdFromCookie } from '../../utils/extractUserIdFromCookie';

const MeetingCreatePage = () => {
  const navigate = useNavigate();
  const [CreateMeetingFormData, setFormData] = useState<CreateMeetingFormData>({
    userId: 0,
    meetingCategoryId: 1,
    meetingTitle: '',
    totalCapacity: 1,
    isLimited: false,
    meetingLocation: '',
    meetingTime: '',
    meetingContent: '',
    isAuthType: false
  });
  // 컴포넌트 마운트 시 userId 설정
  useEffect(() => {
    const setUserId = async () => {
      const userId = await extractUserIdFromCookie() || '11123';
      setFormData(prev => ({
        ...prev,
        userId: parseInt(userId)
      }));
    };
    setUserId();
  }, []);

  const handleParticipantsChange = (value: number) => {
    setFormData(prev => ({
      ...prev,
      totalCapacity: value
    }));
  };

  const handleParticipantsLimitChange = (hasLimit: boolean) => {
    setFormData(prev => ({
      ...prev,
      isLimited: hasLimit,
      totalCapacity: hasLimit ? 1 : 0
    }));
  };

  const handleJoinMethodChange = (isAuthType: boolean) => {
    setFormData(prev => ({
      ...prev,
      isAuthType
    }));
  };

  const buttonActionProps = async () => {    
    try {    
      const requiredFields = [
        { field: 'meetingTitle', label: '제목' },
        { field: 'meetingCategoryId', label: '모임 유형' },
        { field: 'meetingLocation', label: '모임 장소' },
        { field: 'meetingTime', label: '모임 일시' },
        { field: 'meetingContent', label: '모임 설명' }
      ];
  
      // 비어있는 필수 필드 찾기
      const emptyFields = requiredFields.filter(
        ({ field }) => !CreateMeetingFormData[field as keyof CreateMeetingFormData]
      );
  
      // 비어있는 필드가 있으면 알림 후 함수 종료
      if (emptyFields.length > 0) {
        alert(`다음 필드를 입력해주세요: ${emptyFields.map(f => f.label).join(', ')}`);
        return;
      }
      
      const nowUserId = await extractUserIdFromCookie();
      
      // userId가 null이면 에러 처리
      if (!nowUserId) {
        alert('로그인이 필요한 서비스입니다.');
        return;
      }
  
      const data: CreateMeetingFormData = {
        ...CreateMeetingFormData,
      };
      
      const result = await meetingApi.postMeeting(data);
      await console.log('data!!!!!!', result);
    } catch (error) {
      console.log('요청 실패', CreateMeetingFormData);
      throw error;
    }
  };

  return (
    <div className="meeting-create-page">
      <span className="meeting-create-page-notice">
        * 표시는 필수 입력사항 입니다.
      </span>
      <form className="meeting-create-page-form">
        <CategoryInput
          value={CreateMeetingFormData.meetingCategoryId}  // title이 아닌 category 값을 전달
          onChange={(value) => setFormData(prev => ({...prev, meetingCategoryId: value}))}
        />
        <TitleInput 
          value={CreateMeetingFormData.meetingTitle}
          onChange={(value) => setFormData(prev => ({...prev, meetingTitle: value}))}
        />
        <ParticipateInput 
          value={CreateMeetingFormData.totalCapacity}
          onChange={handleParticipantsChange}
          hasLimit={CreateMeetingFormData.isLimited}
          onLimitChange={handleParticipantsLimitChange}
          min={1}
          max={10}
        />
        <MapSelector 
          location={CreateMeetingFormData.meetingLocation}
          onChange={(value) => setFormData(prev => ({...prev, meetingLocation: value}))}
        />
        <CalenderSelector 
          meetingTime={CreateMeetingFormData.meetingTime}
          onDateChange={(value) => setFormData(prev => ({...prev, meetingTime: value}))}
        />
        <DescInput 
          value={CreateMeetingFormData.meetingContent}
          onChange={(value) => setFormData(prev => ({...prev, meetingContent: value}))}
        />
        <JoinMethodInput
          value={CreateMeetingFormData.isAuthType}
          onChange={handleJoinMethodChange}
        />
        <CommonButton1        
          text="모임 생성하기" 
          onClick={buttonActionProps}
          preventDefault={true}
        />
      </form>
    </div>
  );
};

export default MeetingCreatePage;