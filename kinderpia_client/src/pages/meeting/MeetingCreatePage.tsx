import { useState } from 'react';
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

const MeetingCreatePage = () => {
  const navigate = useNavigate(); 
  const [CreateMeetingFormData, setFormData] = useState<CreateMeetingFormData>({
    title: '',
    category: '',
    participants: 1,
    hasParticipantsLimit: false,  // 초기값 추가
    location: '',
    selectedDate: '',
    selectedTime: '',
    description: '',
    JoinMethod: false
  });

  const handleParticipantsChange = (value: number) => {
    setFormData(prev => ({
      ...prev,
      participants: value
    }));
  };

  const handleParticipantsLimitChange = (hasLimit: boolean) => {
    setFormData(prev => ({
      ...prev,
      hasParticipantsLimit: hasLimit,
      participants: hasLimit ? 1 : 0
    }));
  };

  const handleJoinMethodChange = (JoinMethod: boolean) => {
    setFormData(prev => ({
      ...prev,
      JoinMethod
    }));
  };

  const buttonActionProps = async () => {    
    try {    
      const requiredFields = [
        { field: 'title', label: '제목' },
        { field: 'category', label: '모임 유형' },
        { field: 'location', label: '모임 장소' },
        { field: 'selectedDate', label: '모임 날짜' },
        { field: 'selectedTime', label: '모임 시간' },
        { field: 'description', label: '모임 설명' }
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
      const data = {
        title: CreateMeetingFormData.title,
        category: CreateMeetingFormData.category,
        participants: CreateMeetingFormData.participants,
        hasParticipantsLimit: CreateMeetingFormData.hasParticipantsLimit,
        location: CreateMeetingFormData.location,
        selectedDate: CreateMeetingFormData.selectedDate,
        selectedTime: CreateMeetingFormData.selectedTime,
        description: CreateMeetingFormData.description,
        JoinMethod : CreateMeetingFormData.JoinMethod
      };
      
      // const result = await meetingApi.createMeeting(data);
      alert('모임 생성에 성공했습니다!');
      // console.log(' 어쩌구 저쩌구 요청 성공 ', CreateMeetingFormData, '----------------------', data);
      navigate('/meeting/100'); 
    } catch (error) {
      console.log(' 어쩌구 저쩌구 요청 대 실패 ', CreateMeetingFormData);
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
          value={CreateMeetingFormData.category}  // title이 아닌 category 값을 전달
          onChange={(value) => setFormData(prev => ({...prev, category: value}))}
        />
        <TitleInput 
          value={CreateMeetingFormData.title}
          onChange={(value) => setFormData(prev => ({...prev, title: value}))}
        />
        <ParticipateInput 
          value={CreateMeetingFormData.participants}
          onChange={handleParticipantsChange}
          hasLimit={CreateMeetingFormData.hasParticipantsLimit}
          onLimitChange={handleParticipantsLimitChange}
          min={1}
          max={10}
        />
        <MapSelector 
          location={CreateMeetingFormData.location}
          onChange={(value) => setFormData(prev => ({...prev, location: value}))}
        />
        <CalenderSelector 
          date={CreateMeetingFormData.selectedDate}
          time={CreateMeetingFormData.selectedTime}
          onDateChange={(value) => setFormData(prev => ({...prev, selectedDate: value}))}
          onTimeChange={(value) => setFormData(prev => ({...prev, selectedTime: value}))}
        />
        <DescInput 
          value={CreateMeetingFormData.description}
          onChange={(value) => setFormData(prev => ({...prev, description: value}))}
        />
        <JoinMethodInput
          value={CreateMeetingFormData.JoinMethod}
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