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
import CommonButton1 from '../../components/common/CommonButton1';

// api요청 함수 호출
import { putMeeting, getMeeting } from '../../api/meeting';

//스타일 호출
import '../../styles/meeting/createpage/MeetingUpdatePage.scss';
import { categoryList } from '../../data/tempCategoryList';
import { extractUserIdFromCookie } from '../../utils/extractUserIdFromCookie';

function MeetingUpdatePage() {
  // 수정 전 데이터 상태관리
  const [initialMeetingData, setInitialMeetingData] = useState<MeetingDetailData>();
  // 수정할 데이터 상태관리
  const [updateFormData, setUpdateFormData] = useState<UpdateMeetingFormData>();
  const [categoryId, setCategoryId] = useState<number>(0);
  const { meetingId } = useParams<{ meetingId: string }>();
  const navigate = useNavigate();

  // 카테고리 ID 찾는 함수
  const findCategoryIdByLabel = (categoryLabel: string): number => {
    const category = categoryList.find(cat => cat.label === categoryLabel);
    return category ? category.value : 6;
  };

useEffect(() => {
  if (!meetingId) {
    navigate('/not-found'); 
    return;
  }

  const fetchMeetingData = async () => {
    try {
      const currentUserId = await extractUserIdFromCookie();
      const result = await getMeeting(Number(meetingId));
      if (result.userId !== Number(currentUserId)) {
        navigate('/not-found');
        return;
      }

      setInitialMeetingData(result);
      
      if (result.meetingCategory) {
        setCategoryId(findCategoryIdByLabel(result.meetingCategory));
      }

      setUpdateFormData({
        meetingTitle: result.meetingTitle,
        totalCapacity: result.totalCapacity,
        isLimited: result.totalCapacity > 0,
        meetingContent: result.meetingContent
      });

    } catch (error) {
      console.error('모임 데이터 로딩 중 에러 발생:', error);
      navigate('/error');
    }
  };

  fetchMeetingData();
}, [meetingId, navigate]);

  const handleParticipantsChange = (value: number) => {
    setUpdateFormData(prev => ({
      ...prev!,
      totalCapacity: value
    }));
  };

  const handleLimitChange = (hasLimit: boolean) => {
    setUpdateFormData(prev => ({
      ...prev!,
      isLimited: hasLimit,
      totalCapacity: hasLimit ? 1 : 99
    }));
  };

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
          hasLimit={updateFormData.isLimited}
          onLimitChange={handleLimitChange}
          min={1}
          max={20}
        />
        
        {/* DescInput - 설명 (수정 가능) */}
        <DescInput
          value={updateFormData.meetingContent  }
          onChange={(value) =>
            setUpdateFormData(prev => ({ ...prev!, meetingContent: value }))
          }
        />      
        
        <form className="meeting-update-page-form">
        {/* CategoryInput - 카테고리 (수정 불가) */}
        <CategoryInput
          value={categoryId}
          disabled={true}
          isRequired={false}
        />

        {/* 모임 장소 (수정 불가) */}
        <div className="location">
          <label>모임 장소</label>
          <hr />
          <span  className='text-body'>
            {initialMeetingData.meetingLocation}
            {initialMeetingData.detailAddress && 
              `  (${initialMeetingData.detailAddress})`}
          </span>
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

        {/* JoinMethodInput - 참가 방식 (수정 불가) */}

        <div className="join-method-container">
          <div className="join-method-header">
            <label className="join-method-header-title">
              신청 방식
            </label>
          </div>
          <hr />
          <div className="join-method-options">
          {!initialMeetingData.authType ?
            <div className="option-item">
              <label>
                <input
                  type="radio"
                  name="joinMethod"
                  value="free"
                  checked={true}
                />
                <div className="option-content">
                  <div className="option-text">
                    <strong>자유 참가</strong>
                    <p>개설자의 승인 없이 참가할 수 있어요</p>
                  </div>
                </div>
              </label>
            </div>

            :<div className="option-item">
              <label>
                <input
                  type="radio"
                  name="joinMethod"
                  value="approval"
                  checked={true}
                />
                <div className="option-content">
                  <div className="option-text">
                    <strong>승인 필요</strong>
                    <p>모임에 참가하려면 개설자의 승인이 필요해요</p>
                  </div>
                </div>
              </label>
            </div>}
          </div>
        </div>
        <div className='btn-wrapper'>
          <CommonButton1
            text={'모임 수정하기'}
            onClick={buttonActionProps}
          />
        </div>
      </form>
    </section>
  );
}

export default MeetingUpdatePage;