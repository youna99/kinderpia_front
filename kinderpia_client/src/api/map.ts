import { requestHeader } from './requestHeader';
import { SearchResultItem, LocationData } from '../types/map';
import axios from 'axios';

// 개발/프로덕션 환경에 따른 기본 URL 설정
const API_BASE_URL = process.env.REACT_APP_MAP_URL || 'http://localhost:4000';

export const searchLocation = async (query: string): Promise<SearchResultItem[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/search`, {
      params: { query },
      withCredentials: true
    });
    console.log(response.data.places);
    return response.data.places;
  } catch (error) {
    console.error('위치 검색 오류:', error);
    throw error;
  }
};

export const getCoordinate = async(query: string): Promise<LocationData> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/coordinate`, {
      params: { query },
      // CORS 인증 정보 포함
      withCredentials: true
    });
    
    return response.data;
  } catch (error) {
    console.error('위치 검색 오류:', error);
    throw error;
  }
}