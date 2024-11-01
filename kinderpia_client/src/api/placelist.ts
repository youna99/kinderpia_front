import { requestHeader } from './requestHeader';

export const getPlaces = async (params: {
  sort: string;
  page: number;
  size: number;
  category?: string;
  keyword?: string;
}) => {
  const response = await requestHeader.get('/api/place', { params });
  return response.data;
};

export const getPlace = async (placeId: any) => {
  try {
    const response = await requestHeader.get(`/api/place/${placeId}`, {
      withCredentials: true
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.error(`장소를 찾을 수 없습니다. PlaceId: ${placeId}`);
      
    }
    throw error; // 에러를 다시 던져서 호출하는 쪽에서 처리할 수 있게 함
  }
};