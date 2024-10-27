import React, { useState } from 'react';
import { CreateMeetingFormData } from '../../types/meeting';
import { TitleInput } from '../../components/meeting/TitleInput';
import { ParticipateInput } from '../../components/meeting/ParticipateInput';
import { MapSelector } from '../../components/common/MapSelector';
import { CalanderSelector } from '../../components/common/CalanderSelector';
import { DescInput } from '../../components/meeting/DescInput';
import CommonButton1 from '../../components/common/CommonButton1';

import { meetingApi } from '../../api/meeting';

const MeetingCreate = () => {
  const [CreateMeetingFormData, setFormData] = useState<CreateMeetingFormData>({
    title: '',
    participants: 1,
    location: '',
    selectedDate: '',
    selectedTime: '',
    description: ''
  });

  const buttonActionProps = async () => {    
    try {
      const data = {
        title: CreateMeetingFormData.title,
        participants: CreateMeetingFormData.participants,
        location: CreateMeetingFormData.location,
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
      <TitleInput 
        value={CreateMeetingFormData.title}
        onChange={(value) => setFormData(prev => ({...prev, title: value}))}
      />
      <ParticipateInput 
        value={CreateMeetingFormData.participants}
        onChange={(value) => setFormData(prev => ({...prev, participants: value}))}
      />
      <MapSelector 
        value={CreateMeetingFormData.location}
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