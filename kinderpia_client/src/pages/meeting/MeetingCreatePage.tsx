import React, { useState, useEffect } from 'react';

// type 호출
import { CreateMeetingFormData } from '../../types/meeting';

// component 호출 - 모임
import TitleInput from '../../components/meeting/TitleInput';
import ParticipateInput from '../../components/meeting/ParticipateInput';
import DescInput from '../../components/meeting/DescInput';
import CategoryInput from '../../components/meeting/CategoryInput';
import JoinMethodInput from '../../components/meeting/JoinMethodInput';

// component 호출 - 공용
import MapSelector from '../../components/common/MapSelector';
import CalenderSelector from '../../components/common/CalanderSelector';
import CommonButton1 from '../../components/common/CommonButton1';

// api 요청 함수 호출
import { meetingApi } from '../../api/meeting';

//style 호출
import '../../styles/meeting/MeetingCreatePage.scss'

const MeetingCreatePage = () => {
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

  useEffect(()=>{
    console.log(CreateMeetingFormData);
  },[CreateMeetingFormData])

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
      
      const result = await meetingApi.createMeeting(data);
      
      console.log(result);
      
      console.log(' 어쩌구 저쩌구 요청 성공 ', CreateMeetingFormData, '----------------------', data);
      
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
          value={CreateMeetingFormData.title}
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
        />
      </form>
    </div>
  );
};

export default MeetingCreatePage;