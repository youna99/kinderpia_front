import React, { useState } from 'react';
// type 호출
import { CreateMeetingFormData } from '../../types/meeting';

// component 호출 - 모임
import TitleInput from '../../components/meeting/TitleInput';
import ParticipateInput from '../../components/meeting/ParticipateInput';
import DescInput from '../../components/meeting/DescInput';
import CategoryInput from '../../components/meeting/CategoryInput';

// component 호출 - 공용
import MapSelector from '../../components/common/MapSelector';
import CalanderSelector from '../../components/common/CalanderSelector';
import CommonButton1 from '../../components/common/CommonButton1';

// api 요청 함수 호출
import { meetingApi } from '../../api/meeting';

const MeetingCreate = () => {
  const [CreateMeetingFormData, setFormData] = useState<CreateMeetingFormData>({
    title: '',
    category: '',
    participants: 1,
    hasParticipantsLimit: false,  // 초기값 추가
    location: '',
    latitute: 0,
    longitute: 0,
    selectedDate: '',
    selectedTime: '',
    description: ''
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

  const buttonActionProps = async () => {    
    try {
      const data = {
        title: CreateMeetingFormData.title,
        category: CreateMeetingFormData.category,
        participants: CreateMeetingFormData.participants,
        hasParticipantsLimit: CreateMeetingFormData.hasParticipantsLimit,
        location: CreateMeetingFormData.location,
        latitute: CreateMeetingFormData.latitute,
        longitute: CreateMeetingFormData.longitute,
        selectedDate: CreateMeetingFormData.selectedDate,
        selectedTime: CreateMeetingFormData.selectedTime,
        description: CreateMeetingFormData.description
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
    <div className="w-full max-w-md mx-auto p-4">
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
        latitute={CreateMeetingFormData.latitute}
        longitute={CreateMeetingFormData.longitute}
        onChange={(value) => setFormData(prev => ({...prev, location: value}))}
      />
      <CalanderSelector 
        date={CreateMeetingFormData.selectedDate}
        time={CreateMeetingFormData.selectedTime}
        onDateChange={(value) => setFormData(prev => ({...prev, selectedDate: value}))}
        onTimeChange={(value) => setFormData(prev => ({...prev, selectedTime: value}))}
      />
      <DescInput 
        value={CreateMeetingFormData.description}
        onChange={(value) => setFormData(prev => ({...prev, description: value}))}
      />
      <CommonButton1        
        text="모임 생성하기" 
        onClick={buttonActionProps}
      />
    </div>
  );
};

export default MeetingCreate;