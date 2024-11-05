import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// 타입 호출
import {
  MeetingDetailData,
  UpdateMeetingFormData,
} from '../../types/meeting';

// 컴포넌트 호출
import CategoryInput from '../../components/meeting/createpage/CategoryInput';
import TitleInput from '../../components/meeting/createpage/TitleInput';
import ParticipateInput from '../../components/meeting/createpage/ParticipateInput';
import DescInput from '../../components/meeting/createpage/DescInput';
import JoinMethodInput from '../../components/meeting/createpage/JoinMethodInput';
import CommonButton1 from '../../components/common/CommonButton1';

// api요청 함수 호출
import { putMeeting, getMeeting, meetingApi } from '../../api/meeting';

//스타일 호출
import '../../styles/meeting/createpage/MeetingUpdatePage.scss';
import { categoryList } from '../../data/tempCategoryList';
import { extractUserIdFromCookie } from '../../utils/extractUserIdFromCookie';

function MeetingUpdatePage() {
  // 수정 전 데이터 상태관리
  const [initialMeetingData, setInitialMeetingData] = useState<MeetingDetailData>();
  // 수정할 데이터 상태관리
  const [updateFormData, setUpdateFormData] = useState<UpdateMeetingFormData>();
  const [categoryId , setCategoryId] = useState<number>(0);
  const { meetingId } = useParams<{ meetingId: string }>();
  const navigate = useNavigate();

  // 초기 데이터 로딩
  useEffect(() => {
    if (!meetingId) {
      navigate('/not-found'); 
      return;
    }
    
    const MEETING_TYPES = categoryList;
    const findCategoryIdByLabel = (categoryLabel: string): number => {
      const category = categoryList.find(cat => cat.label === categoryLabel);
      return category ? category.value : 6; // 일치하는 카테고리가 없으면 기본값 6(기타) 반환
    };
    const fetchMeetingData = async () => {
      try {
        const result = await getMeeting(Number(meetingId));
        setInitialMeetingData(result);
        
        if(!initialMeetingData?.meetingCategory){
          return;
        }

        setCategoryId(findCategoryIdByLabel(initialMeetingData?.meetingCategory));
        // 수정 가능한 필드들만 updateFormData에 설정
        setUpdateFormData({
          meetingTitle: result.meetingTitle,
          totalCapacity: result.totalCapacity,
          limited: result.totalCapacity > 0,
          meetingContent: result.meetingContent
        });

      } catch (error) {
        console.error('모임 데이터 로딩 중 에러 발생:', error);
        navigate('/error');
      }
    };

    fetchMeetingData();
  }, [meetingId, navigate]);

  // 참가 인원 변경 핸들러
  const handleParticipantsChange = (value: number) => {
    setUpdateFormData(prev => ({
      ...prev!,
      totalCapacity: value
    }));
  };

  // 참가 인원 제한 여부 변경 핸들러
  const handleLimitChange = (hasLimit: boolean) => {
    setUpdateFormData(prev => ({
      ...prev!,
      hasParticipantsLimit: hasLimit,
      totalCapacity: hasLimit ? prev!.totalCapacity : 0
    }));
  };

  // 로딩 중 상태 표시
  if (!initialMeetingData || !updateFormData) {
    return <div className="loading">데이터를 불러오는 중입니다...</div>;
  }

  const buttonActionProps= async () => {    
    try {    
      const requiredFields = [
        { field: 'meetingTitle', label: '제목' },
        { field: 'meetingContent', label: '모임 설명' }
      ];
  
      const emptyFields = requiredFields.filter(
        ({ field }) => !updateFormData[field as keyof UpdateMeetingFormData]
      );
  
      if (emptyFields.length > 0) {
        alert(`다음 필드를 입력해주세요: ${emptyFields.map(f => f.label).join(', ')}`);
        return;
      }
      
      const nowUserId = await extractUserIdFromCookie();
      
      if (!nowUserId) {
        alert('로그인이 필요한 서비스입니다.');
        return;
      }
  
      const data: UpdateMeetingFormData = {
        ...updateFormData,
      };
      console.log(data);
      
      const result = await putMeeting(Number(meetingId), data);
      if(result){
        navigate(`/meeting/${meetingId}`);
      }
    } catch (error) {
      console.log('요청 실패', updateFormData);
      throw error;
    }
  };

  return (
    <section className="meeting-update-page">
      <span className="meeting-update-page-notice">
        <span className='xi-check'></span> 표시만 수정 가능합니다.
      </span>
      <form className="meeting-update-page-form">
        {/* CategoryInput - 카테고리 (수정 불가) */}
        <CategoryInput
          value={categoryId}
          disabled={true}
          isRequired={false}
        />

        {/* TitleInput - 제목 (수정 가능) */}
        <TitleInput
          value={updateFormData.meetingTitle}
          onChange={(value) =>
            setUpdateFormData(prev => ({ ...prev!, meetingTitle: value }))
          }
          maxLength={20}
          placeholder="모임의 제목을 입력해주세요"
        />
        
        {/* ParticipateInput - 참가 인원 (수정 가능) */}
        <ParticipateInput
          value={updateFormData.totalCapacity}
          onChange={handleParticipantsChange}
          hasLimit={updateFormData.limited}
          onLimitChange={handleLimitChange}
          min={1}
          max={20}
        />

        {/* 모임 장소 (수정 불가) */}
        <div className="location">
          <label>모임 장소</label>
          <hr />
          <div className='text-body'>
            {initialMeetingData.meetingLocation}
            {initialMeetingData.detailAddress && 
              ` (${initialMeetingData.detailAddress})`}
          </div>
        </div>

        {/* 모임 일시 (수정 불가) */}
        <div className="Date-Time">
          <label>모임 일시</label>
          <hr />
          <div>
            <span className='text-body'>
              {new Date(initialMeetingData.meetingTime).toLocaleString()}
            </span>
          </div>
        </div>

        {/* DescInput - 설명 (수정 가능) */}
        <DescInput
          value={updateFormData.meetingContent  }
          onChange={(value) =>
            setUpdateFormData(prev => ({ ...prev!, description: value }))
          }
        />

        {/* JoinMethodInput - 참가 방식 (수정 불가) */}
        <JoinMethodInput
          value={initialMeetingData.authType}
          disabled={true}
          isRequired={false}
        />
        <CommonButton1
          text={'모임 수정하기'}
          onClick={buttonActionProps}
        />
      </form>
    </section>
  );
}

export default MeetingUpdatePage;