import React, { useState } from 'react';
import {
  CreateMeetingFormData,
  UpdateMeetingFormData,
} from '../../types/meeting';
import CategoryInput from '../../components/meeting/createpage/CategoryInput';
import TitleInput from '../../components/meeting/createpage/TitleInput';
import ParticipateInput from '../../components/meeting/createpage/ParticipateInput';
import DescInput from '../../components/meeting/createpage/DescInput';
import JoinMethodInput from '../../components/meeting/createpage/JoinMethodInput';
import CommonButton1 from '../../components/common/CommonButton1';
import { putMeeting } from '../../api/meeting';

import '../../styles/meeting/createpage/MeetingUpdatePage.scss';

const data: CreateMeetingFormData = {
  userId: 1,
  meetingTitle: '에버랜드 같이 가요~!',
  meetingCategoryId: 1,
  totalCapacity: 5,
  isLimited: true,
  meetingLocation: '용산구',
  meetingTime: '2024-10-30 10:00',
  meetingContent: '에버랜드 같이 갈 사람 구해요~!!!',
  isAuthType: true,
};

function MeetingUpdatePage() {
  // 수정 전 데이터 상태관리
  const [initialMeetingData, setInitialMeetingData] =
    useState<CreateMeetingFormData>(data);

  // 수정 한 데이터 상태관리
  const [updateFormData, setUpdateFormData] = useState<UpdateMeetingFormData>({
    meetingTitle: initialMeetingData.meetingTitle,
    totalCapacity: initialMeetingData.totalCapacity,
    hasParticipantsLimit: initialMeetingData.isLimited,
    description: initialMeetingData.meetingContent,
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
      totalCapacity: hasLimit ? Math.max(initialMeetingData.totalCapacity, 1) : 0,
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
          value={initialMeetingData.meetingCategoryId}
          disabled={true}
          isRequired={false}
        />
        <TitleInput
          value={updateFormData.meetingTitle}
          onChange={(value) =>
            setUpdateFormData((prev) => ({ ...prev, meetingTitle: value }))
          }
        />
        <ParticipateInput
          value={updateFormData.totalCapacity}
          onChange={handleParticipantsChange}
          hasLimit={updateFormData.hasParticipantsLimit}
          onLimitChange={handleLimitChange}
          min={1}
          max={10}
        />
        <div className="location">
          <label>모임 장소</label>
          <hr />
          <div>{initialMeetingData.meetingLocation}</div>
        </div>
        <div className="Date-Time">
          <label>모임 일시</label>
          <hr />
          <div>
            <span>{initialMeetingData.meetingTime}</span>
          </div>
        </div>
        <DescInput
          value={updateFormData.description}
          onChange={(vaule) =>
            setUpdateFormData((prev) => ({ ...prev, description: vaule }))
          }
        />
        <JoinMethodInput
          value={initialMeetingData.isAuthType}
          disabled={true}
          isRequired={false}
        />
        <CommonButton1 text="모임 수정하기" onClick={buttonActionProps} />
      </form>
    </section>
  );
}

export default MeetingUpdatePage;
