import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // import 추가
import Joyride, { Step } from 'react-joyride';

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
import FakerComponent from '../../components/common/FakerComponent';

// api 요청 함수 호출
import { postMeeting } from '../../api/meeting';

// style 호출
import '../../styles/meeting/createpage/MeetingCreatePage.scss';

// utils 호출
import { extractUserIdFromCookie } from '../../utils/extractUserIdFromCookie';
import createFakeMeeting from '../../utils/createDummyMeeting';
import { simpleAlert } from '../../utils/alert';

const MeetingCreatePage = () => {
  const navigate = useNavigate();
  const [CreateMeetingFormData, setFormData] = useState<CreateMeetingFormData>({
    userId: 0,
    meetingCategoryId: 1,
    meetingTitle: '',
    totalCapacity: 99,
    district: '',
    isLimited: false,
    meetingLocation: '',
    meetingTime: '',
    meetingContent: '',
    detailAddress: '',
    authType: false,
  });
  const [run, setRun] = useState(false); // Joyride 상태 관리

  useEffect(() => {
    const setUserId = async () => {
      const userId = await extractUserIdFromCookie();
      if (!userId) {
        return;
      }

      setFormData((prev) => ({
        ...prev,
        userId: parseInt(userId),
      }));
    };
    setUserId();
  }, []);

  const handleParticipantsChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      totalCapacity: value,
    }));
  };

  const handleParticipantsLimitChange = (hasLimit: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isLimited: hasLimit,
      totalCapacity: hasLimit ? 1 : 99,
    }));
  };

  const handleJoinMethodChange = (authType: boolean) => {
    setFormData((prev) => ({
      ...prev,
      authType,
    }));
  };

  const steps: Step[] = [
    {
      target: '#help-info',
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p className="joyride-content-title">
            해당 페이지의 <span className="accent">사용법</span>을 소개합니다.
          </p>
          <p>
            건너뛰시려면 왼쪽 하단의
            <br />"<span className="accent">Skip</span>"을 눌러주세요!
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.meeting-create-page-form-category',
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p>생성할 모임의 종류를 고를 수 있습니다.</p>
          <p>
            이 모임이 어떤 테마를 가지고 있는지
            <br />
            간략하게 소개하는 항목입니다.
          </p>
        </div>
      ),
      spotlightClicks: true,
    },
    {
      target: '.meeting-create-page-form-title',
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p>생성할 모임의 제목을 정할 수 있습니다.</p>
          <p>
            해당 모임이 <br />
            어떤 이름을 가질지 정해주세요.
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.meeting-create-page-form-participate', // 인기 장소 섹션
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p>모임의 참여 인원을 정할 수 있습니다.</p>
          <p>제한을 두고싶지 않다면 왼쪽</p>
          <p>
            제한을 두고싶으면 오른쪽에서
            <br /> 숫자를 입력해주세요
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.meeting-create-page-form-map', // 신규 모임 섹션
      placement: 'top',
      content: (
        <div className="joyride-content">
          <p>
            모임이 어디서 이루어지는지 <br />
            정할 수 있습니다.
          </p>
          <p>검색을 통해 모임 장소를 찾아주세요</p>
          <p>
            모임 장소는 간략한 지도에서도 <br />
            확인할 수 있습니다.
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.meeting-create-page-form-calender', // 신규 모임 섹션
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p>
            모임이 언제 이루어지는지 <br />
            정할 수 있습니다.
          </p>
          <p>날짜는 달력을 통해 정해주세요</p>
          <p>시간은 오전/오후, 시간을 정해주세요</p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.meeting-create-page-form-desc', // 신규 모임 섹션
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p>
            모임에 대해서 설명하는 글을 <br />
            작성할 수 있습니다.
          </p>
          <p>
            다른 분들에게 모임이 어떤 모임인지 <br />
            소개하는 글을 작성해주세요
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.meeting-create-page-form-joinmethod', // 신규 모임 섹션
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p>
            모임에 참여하려면 승인이 필요한지 <br />
            여부를 정할 수 있습니다.
          </p>
          <p>
            {' '}
            모임에 참여하려면 <br />
            자유롭게 참가할 수있는지 <br />
            당신의 허락이 필요한지 정해주세요
          </p>
        </div>
      ),
      disableBeacon: true,
    },
    {
      target: '.meeting-create-page-form-submit', // 신규 모임 섹션
      placement: 'bottom',
      content: (
        <div className="joyride-content">
          <p>드디어 제출 버튼입니다.</p>
          <p>
            이 버튼을 누르면 모임이 생성되고, <br />
            다른 사람들이 참여할 수 있게 됩니다.
          </p>
        </div>
      ),
      disableBeacon: true,
    },
  ];

  const buttonActionProps = async () => {
    try {
      const requiredFields = [
        { field: 'meetingTitle', label: '제목' },
        { field: 'meetingCategoryId', label: '모임 유형' },
        { field: 'meetingLocation', label: '모임 장소' },
        { field: 'meetingTime', label: '모임 일시' },
        { field: 'meetingContent', label: '모임 설명' },
      ];

      const emptyFields = requiredFields.filter(
        ({ field }) =>
          !CreateMeetingFormData[field as keyof CreateMeetingFormData]
      );

      if (emptyFields.length > 0) {
        alert(
          `다음 필드를 입력해주세요: ${emptyFields
            .map((f) => f.label)
            .join(', ')}`
        );
        return;
      }

      const nowUserId = await extractUserIdFromCookie();

      if (!nowUserId) {
        alert('로그인이 필요한 서비스입니다.');
        return;
      }

      const data: CreateMeetingFormData = {
        ...CreateMeetingFormData,
      };
      console.log(data);

      const result = await postMeeting(data);

      navigate(`/meeting/${result.data}`);
    } catch (error) {
      console.log('요청 실패', CreateMeetingFormData);
      throw error;
    }
  };

  const fakeCreateMeeting = async () => {
    const data = await createFakeMeeting();

    if (!data) {
      simpleAlert(
        'error',
        '더미 모임을 생성하려면 로그인 하셔야 해요!',
        'center'
      );
      return;
    }

    const result = await postMeeting(data);
    if (!result) {
      simpleAlert('error', '모임 생성에 실패하셨어요!! ', 'center');
      return;
    }
    navigate(`/meeting/${result.data}`);
  };

  return (
    <section className="meeting-create-page">
      <Joyride
        steps={steps}
        run={run}
        continuous={true}
        showSkipButton={true}
        styles={{
          options: {
            backgroundColor: '#fff', // 배경색
            primaryColor: '#59a4d6', // 주요 색상
            textColor: '#333', // 텍스트 색상
            arrowColor: '#fff', // 화살표 색상
            width: '300px', // 너비 조정
          },
        }}
        callback={(data) => {
          const { status } = data;
          if (status === 'finished' || status === 'skipped') {
            setRun(false);
          }
        }}
      />
      <section className="meeting-create-page-notice">
        <span className="tooltip-animation">도움말</span>
        <button
          type="button"
          id="help-info"
          title="도움말"
          onClick={() => setRun(true)} // 버튼 클릭 시 튜토리얼 시작
        >
          <i className="xi-info-o help-info-icon"></i>
        </button>
        <div className="meeting-create-page-notice-content">
          <i className="xi-check"></i> 표시는 필수 입력사항 입니다.
        </div>
      </section>
      <FakerComponent
        text={`무작위 데이터 모임 생성하기`}
        onClick={fakeCreateMeeting}
      />
      <form className="meeting-create-page-form">
        <section className="meeting-create-page-form-category">
          <CategoryInput
            value={CreateMeetingFormData.meetingCategoryId}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, meetingCategoryId: value }))
            }
          />
        </section>
        <section className="meeting-create-page-form-title">
          <TitleInput
            value={CreateMeetingFormData.meetingTitle}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, meetingTitle: value }))
            }
          />
        </section>
        <section className="meeting-create-page-form-participate">
          <ParticipateInput
            value={CreateMeetingFormData.totalCapacity}
            onChange={handleParticipantsChange}
            hasLimit={CreateMeetingFormData.isLimited}
            onLimitChange={handleParticipantsLimitChange}
            min={1}
            max={20}
          />
        </section>
        <section className="meeting-create-page-form-map">
          <MapSelector
            location={CreateMeetingFormData.meetingLocation}
            detailAddress={CreateMeetingFormData.detailAddress}
            district={CreateMeetingFormData.district}
            onChangeL={(value) =>
              setFormData((prev) => ({ ...prev, meetingLocation: value }))
            }
            onChangeA={(value) =>
              setFormData((prev) => ({ ...prev, detailAddress: value }))
            }
            onChangeD={(value) =>
              setFormData((prev) => ({ ...prev, district: value }))
            }
          />
        </section>
        <section className="meeting-create-page-form-calender">
          <CalenderSelector
            meetingTime={CreateMeetingFormData.meetingTime}
            onDateChange={(value) =>
              setFormData((prev) => ({ ...prev, meetingTime: value }))
            }
          />
        </section>
        <section className="meeting-create-page-form-desc">
          <DescInput
            value={CreateMeetingFormData.meetingContent}
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, meetingContent: value }))
            }
          />
        </section>
        <section className="meeting-create-page-form-joinmethod">
          <JoinMethodInput
            value={CreateMeetingFormData.authType}
            onChange={handleJoinMethodChange}
          />
        </section>
        <section className="meeting-create-page-form-submit">
          <CommonButton1
            text="모임 생성하기"
            onClick={buttonActionProps}
            preventDefault={true}
          />
        </section>
      </form>
    </section>
  );
};

export default MeetingCreatePage;
