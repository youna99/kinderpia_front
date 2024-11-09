import { PlaceData } from '../types/place';

export const dummyPlaceDetail: PlaceData = {
  placeId: '1',
  placeName: '새싹 영등포캠퍼스',
  placeCategoryName: '교육, 뭐시기',
  location: '영등포구',
  detailAddress: '', // 필요시 상세 주소 입력
  latitude: 37.5559,
  longitude: 126.9723,
  // placeImg: '', // 이미지 URL 입력
  paid: false, // '무료'에 해당하는 boolean 값
  operatingDate: '연중무휴',
  homepageUrl: 'http://localhost:3000', // URL 형식으로 수정
  placeNum: '', // 필요시 전화번호 입력
};
