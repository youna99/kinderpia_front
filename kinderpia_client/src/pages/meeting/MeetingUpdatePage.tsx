import React, { useState } from 'react';
import {
  CreateMeetingFormData,
  UpdateMeetingFormData,
} from '../../types/meeting';
import CategoryInput from '../../components/meeting/CategoryInput';
import TitleInput from '../../components/meeting/TitleInput';
import ParticipateInput from '../../components/meeting/ParticipateInput';
import DescInput from '../../components/meeting/DescInput';
import JoinMethodInput from '../../components/meeting/JoinMethodInput';
import CommonButton1 from '../../components/common/CommonButton1';
import { updateMeeting } from '../../api/meeting';

import '../../styles/meeting/createpage/MeetingUpdatePage.scss';

const data: CreateMeetingFormData = {
  title: '에버랜드 같이 가요~!',
  category: '오락 & 여가',
  participants: 5,
  hasParticipantsLimit: true,
  location: '용산구',
  selectedDate: '2024-10-30',
  selectedTime: '10:00',
  description: '에버랜드 같이 갈 사람 구해요~!!!',
  JoinMethod: true,
};

function MeetingUpdatePage() {
  // 수정 전 데이터 상태관리
  const [initialMeetingData, setInitialMeetingData] =
    useState<CreateMeetingFormData>(data);

  // 수정 한 데이터 상태관리
  const [updateFormData, setUpdateFormData] = useState<UpdateMeetingFormData>({
    title: initialMeetingData.title,
    participants: initialMeetingData.participants,
    hasParticipantsLimit: initialMeetingData.hasParticipantsLimit,
    description: initialMeetingData.description,
  }); // 초기값 설정

  const handleParticipantsChange = (value: number) => {
    setUpdateFormData((prev) => ({
      ...prev,
      participants: value,
    }));
  };

  const handleLimitChange = (hasLimit: boolean) => {
    setUpdateFormData((prev) => ({
      ...prev,
      hasParticipantsLimit: hasLimit,
      participants: hasLimit ? Math.max(initialMeetingData.participants, 1) : 0,
    }));
  };

  // 모임 상세 api로 요청해서 초기값 불러오기 (추가해야함)

  // 모임 수정하기 버튼 클릭
  const buttonActionProps = async () => {
    // try {
    //   const updatedData = {
    //     title: updateFormData.title,
    //     participants: updateFormData.participants,
    //     hasParticipantsLimit: updateFormData.hasParticipantsLimit,
    //     description: updateFormData.description,
    //   };
    //   const response = await updateMeeting(updatedData);
    //   console.log('모임 수정 성공:', response);
    // } catch (error) {
    //   console.log('모임 수정하는 중 에러 발생', error);
    // }
  };

  return (
    <section className="meeting-update-page">
      <span className="meeting-update-page-notice">
        * 표시만 수정 가능합니다.
      </span>
      <form className="meeting-update-page-form">
        <CategoryInput
          value={initialMeetingData.category}
          disabled={true}
          isRequired={false}
        />
        <TitleInput
          value={updateFormData.title}
          onChange={(value) =>
            setUpdateFormData((prev) => ({ ...prev, title: value }))
          }
        />
        <ParticipateInput
          value={updateFormData.participants}
          onChange={handleParticipantsChange}
          hasLimit={updateFormData.hasParticipantsLimit}
          onLimitChange={handleLimitChange}
          min={1}
          max={10}
        />
        <div className="location">
          <label>모임 장소</label>
          <hr />
          <div>{initialMeetingData.location}</div>
        </div>
        <div className="Date-Time">
          <label>모임 일시</label>
          <hr />
          <div>
            <span>{initialMeetingData.selectedDate}</span>
            <span>{initialMeetingData.selectedTime}</span>
          </div>
        </div>
        <DescInput
          value={updateFormData.description}
          onChange={(vaule) =>
            setUpdateFormData((prev) => ({ ...prev, description: vaule }))
          }
        />
        <JoinMethodInput
          value={initialMeetingData.JoinMethod}
          disabled={true}
          isRequired={false}
        />
        <CommonButton1 text="모임 수정하기" onClick={buttonActionProps} />
      </form>
    </section>
  );
}

export default MeetingUpdatePage;
