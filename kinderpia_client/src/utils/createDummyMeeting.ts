import { useState } from 'react';
import { extractUserIdFromCookie } from './extractUserIdFromCookie';

export const categoryList = [
  { value: 1, label: '오락 및 여가' },
  { value: 2, label: '자연 및 환경' },
  { value: 3, label: '교육 및 문화' },
  { value: 4, label: '체험 및 활동' },
  { value: 5, label: '스포츠 및 운동' },
  { value: 6, label: '기타' }
];

// 랜덤 장소 데이터
const PLACES = [
  {
    district: '영등포구',
    locations: [
      {
        name: '영등포 문화재단',
        address: '서울 영등포구 국회대로 596 영등포구민회관'
      },
      {
        name: '영등포공원',
        address: '서울 영등포구 영등포동 신길로 275'
      },
      {
        name: '문래근린공원',
        address: '서울 영등포구 문래동3가 61'
      },
      {
        name: '타임스퀘어',
        address: '서울 영등포구 영중로 15 타임스퀘어'
      },
      {
        name: '여의도한강공원',
        address: '서울 영등포구 여의동로 330 한강사업본부 여의도안내센터'
      }
    ]
  },
  {
    district: '강남구',
    locations: [
      {
        name: '선정릉',
        address: '서울 강남구 선릉로100길 1 선릉정릉'
      },
      {
        name: '강남 스포츠문화센터',
        address: '서울 강남구 밤고개로1길 52 강남스포츠문화센터'
      },
      {
        name: '도산공원',
        address: '서울 강남구 도산대로45길 20 도산전시관'
      },
      {
        name: '코엑스몰',
        address: '서울 강남구 영동대로 513'
      },
      {
        name: '봉은사',
        address: '서울 강남구 봉은사로 531 봉은사'
      }
    ]
  },
  {
    district: '마포구',
    locations: [
      {
        name: '망원한강공원',
        address: '서울 마포구 마포나루길 467 한강공원망원지구사무소'
      },
      {
        name: '마포아트센터',
        address: '서울 마포구 대흥로20길 28 마포아트센터'
      },
      {
        name: '경의선숲길',
        address: '서울 마포구 동교동 190-64'
      },
      {
        name: '홍대걷고싶은거리',
        address: '서울 마포구 어울마당로 118'
      },
      {
        name: '상암월드컵경기장',
        address: '서울 마포구 성산동 515-39'
      }
    ]
  },
  {
    district: '종로구',
    locations: [
      {
        name: '경복궁',
        address: '서울 종로구 사직로 161 경복궁'
      },
      {
        name: '창덕궁',
        address: '서울 종로구 율곡로 99'
      },
      {
        name: '북촌한옥마을',
        address: '서울 종로구 계동길 37'
      }
    ]
  },
  {
    district: '용산구',
    locations: [
      {
        name: '국립한글박물관',
        address: '서울 용산구 서빙고로 139 국립한글박물관'
      },
      {
        name: '국립중앙박물관',
        address: '서울 용산구 서빙고로 137 국립중앙박물관'
      },
      {
        name: '이태원거리',
        address: '서울 용산구 이태원로 177'
      }
    ]
  }
];

// 카테고리별 키워드
const CATEGORY_KEYWORDS = {
  1: { // 오락 및 여가
    titles: ['즐거운', '신나는', '재미있는', '흥미진진한', '활기찬'],
    activities: ['보드게임', '방탈출', '레저활동', '문화생활', '취미모임', '영화감상'],
    goals: ['스트레스 해소', '새로운 취미 발견', '즐거운 추억 만들기', '여가 생활 공유'],
    actions: ['즐겨요', '함께해요', '시작해요', '모여요']
  },
  2: { // 자연 및 환경
    titles: ['자연친화', '에코', '그린', '환경보호', '친환경'],
    activities: ['등산', '환경정화', '생태체험', '플로깅', '도시농업', '공원산책'],
    goals: ['환경보호', '자연보호', '생태계 이해', '건강한 환경 만들기'],
    actions: ['지켜요', '보호해요', '실천해요', '참여해요']
  },
  3: { // 교육 및 문화
    titles: ['유익한', '배움가득', '알찬', '교육적인', '문화적인'],
    activities: ['독서토론', '문화탐방', '전시관람', '교육봉사', '스터디', '강연'],
    goals: ['지식 향상', '문화 이해', '교양 증진', '자기계발'],
    actions: ['배워요', '탐구해요', '공부해요', '나눠요']
  },
  4: { // 체험 및 활동
    titles: ['실용적인', '체험하는', '실천하는', '활동적인', '직접하는'],
    activities: ['공예체험', '요리실습', '농촌체험', '직업체험', '현장학습', '실습'],
    goals: ['실무 경험', '직접 체험', '현장 이해', '기술 습득'],
    actions: ['체험해요', '경험해요', '실습해요', '도전해요']
  },
  5: { // 스포츠 및 운동
    titles: ['건강한', '활력있는', '다이나믹한', '열정적인', '강력한'],
    activities: ['조깅', '등산', '자전거', '구기운동', '요가', '피트니스'],
    goals: ['체력 향상', '건강 증진', '운동 습관 형성', '스포츠 실력 향상'],
    actions: ['운동해요', '땀내요', '단련해요', '움직여요']
  },
  6: { // 기타
    titles: ['특별한', '새로운', '창의적인', '독특한', '자유로운'],
    activities: ['자유활동', '친목모임', '동아리', '취미활동', '소모임', '프로젝트'],
    goals: ['다양한 경험', '새로운 시도', '자유로운 활동', '친목 도모'],
    actions: ['만나요', '모여요', '시작해요', '도전해요']
  }
};

// 모임 설명 템플릿
const CONTENT_TEMPLATES = [
  `안녕하세요! {activity} 모임을 시작합니다.

{goal}을 목표로 하는 우리 모임에서 함께하실 분들을 찾고 있습니다.

주요 활동:
- {detailActivity1}
- {detailActivity2}
- {detailActivity3}

이런 분들을 찾습니다:
- 꾸준히 참여 가능하신 분
- {activity}에 관심이 많으신 분
- 함께 성장하고 싶으신 분

정기 모임:
- 주 1회 오프라인 모임
- 자유로운 의견 교환
- 활동 후기 공유

많은 관심과 참여 부탁드립니다!`,
  
  `{goal}을 위한 {activity} 모임입니다!

우리 모임은 다음과 같은 활동을 계획하고 있습니다:

활동 내용:
1. {detailActivity1}
2. {detailActivity2}
3. {detailActivity3}

참여자 기준:
- 성실하게 참여하실 수 있는 분
- {activity}에 열정이 있으신 분
- 긍정적인 마인드를 가지신 분
함께 즐거운 시간 보내실 분들의 많은 참여 바랍니다!`
];

const createMeetingTitle = (categoryId: number) => {
  const category = CATEGORY_KEYWORDS[categoryId as keyof typeof CATEGORY_KEYWORDS];
  const title = category.titles[Math.floor(Math.random() * category.titles.length)];
  const activity = category.activities[Math.floor(Math.random() * category.activities.length)];
  const action = category.actions[Math.floor(Math.random() * category.actions.length)];
  return `${title} ${activity} ${action}`;
};

const getRandomPlace = () => {
  const district = PLACES[Math.floor(Math.random() * PLACES.length)];
  const location = district.locations[Math.floor(Math.random() * district.locations.length)];
  return {
    district: district.district,
    name: location.name,
    address: location.address
  };
};

const getRandomFutureDate = () => {
  const now = new Date();
  const futureDate = new Date(now.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000); // 30일 이내
  return futureDate.toISOString().slice(0, 19).replace('T', ' ');
};

const createMeetingContent = (categoryId: number) => {
  const template = CONTENT_TEMPLATES[Math.floor(Math.random() * CONTENT_TEMPLATES.length)];
  const category = CATEGORY_KEYWORDS[categoryId as keyof typeof CATEGORY_KEYWORDS];
  
  // 랜덤하게 활동들 선택
  const activities = [...category.activities];
  const shuffled = activities.sort(() => 0.5 - Math.random());
  const selectedActivities = shuffled.slice(0, 3);

  return template
    .replaceAll('{activity}', category.activities[Math.floor(Math.random() * category.activities.length)])
    .replace('{goal}', category.goals[Math.floor(Math.random() * category.goals.length)])
    .replace('{detailActivity1}', selectedActivities[0])
    .replace('{detailActivity2}', selectedActivities[1])
    .replace('{detailActivity3}', selectedActivities[2]);
};

const createFakeMeeting = async () => {
  const userId = await extractUserIdFromCookie();
  if (!userId) {
    return;
  }

  const categoryId = Math.floor(Math.random() * 6) + 1;
  const place = getRandomPlace();
  
  const data = {
    authType: Boolean(Math.round(Math.random())),
    detailAddress: `${place.address} ${place.name}`,
    district: place.district,
    isLimited: Boolean(Math.round(Math.random())), // 50% 확률로 true/false
    meetingCategoryId: categoryId,
    meetingContent: createMeetingContent(categoryId),
    meetingLocation: place.name,
    meetingTime: getRandomFutureDate(),
    meetingTitle: createMeetingTitle(categoryId),
    totalCapacity: Math.floor(Math.random() * 15) + 5,
    userId: Number(userId),
  };
  return data;
};

export default createFakeMeeting;