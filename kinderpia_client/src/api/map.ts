import { requestHeader } from './requestHeader';
import { SearchResultItem, LocationData } from '../types/map';
import axios from 'axios';

const API_BASE_URL= 'http://localhost:4000' // ||  process.env.REACT_APP_MAP_URL;

export const searchLocation = async (query: string): Promise<SearchResultItem[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/map/api/search`, {
      params: { query }
    });
    console.log(response.data.places);
    return response.data.places;
  } catch (error) {
    console.error('위치 검색 오류:', error);
    throw error;
  }
};

export const getCoordinate = async(query :string) : Promise<LocationData> =>{
  try {
    const response = await axios.get(`${API_BASE_URL}/map/api/coordinate`, {
      params: { query }
    });
    
    return response.data;
  } catch (error) {
    console.error('위치 검색 오류:', error);
    throw error;
  }
}