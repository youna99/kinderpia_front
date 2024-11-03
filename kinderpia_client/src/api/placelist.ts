import { requestHeader } from './requestHeader';
import { defaultPostReq } from '../types/place';

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

export const getDefaultPlaceList = async (page: number = 1, size: number = 6) => {
  const response = await requestHeader.get('/api/place', {
    params: {
      page,
      size
    }
  });
  return response.data;
};

export const getSearchPlaceList = async (data : defaultPostReq) => {
  const response = await requestHeader.post('/api/place', data);
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
    throw error;
  }
};