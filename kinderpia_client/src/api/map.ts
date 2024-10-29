import { requestHeader } from './requestHeader';
import { SearchResultItem, LocationData } from '../types/map';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export const searchLocation = async (query: string): Promise<SearchResultItem[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/search`, {
      params: { query }
    });
    console.log(response.data.places);
    return response.data.places;
  } catch (error) {
    console.error('위치 검색 오류:', error);
    throw error;
  }
};

export const saveLocation = async (locationData: LocationData): Promise<void> => {
  try {
    await requestHeader.post(`${API_BASE_URL}/api/location`, locationData);
    console.log(locationData);
  } catch (error) {
    console.error('위치 저장 오류:', error);
    throw error;
  }
};

export const getSavedLocation = async (): Promise<LocationData> => {
  try {
    const response = await requestHeader.get(`${API_BASE_URL}/api/location`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('위치 불러오기 오류:', error);
    throw error;
  }
};