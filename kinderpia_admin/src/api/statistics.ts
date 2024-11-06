import { ApiResponse, StatisticsResponse } from '../types/types';
import { requestHeader } from './requestHeader';

  export const fetchTotalUsers = async ()  => {
    try {
      const response = await requestHeader.get('/api/manager/total/userCnt');
      return response.data.data;
    } catch (error) {
      console.error('전체 사용자 수 조회 실패:', error);
      return 0;
    }
  };
  
  export const fetchMonthlyStats = async (year: number): Promise<StatisticsResponse | null> => {
    try {
      const response = await requestHeader.get<ApiResponse<StatisticsResponse>>(`/api/manager/total/userCnt/monthly?year=${year}`);
      return response.data.data;
    } catch (error) {
      console.error('월별 통계 조회 실패:', error);
      return null;
    }
  };
  
  export const fetchDailyStats = async (yearMonth: string): Promise<StatisticsResponse | null> => {
    try {
      const response = await requestHeader.get<ApiResponse<StatisticsResponse>>(`/api/manager/total/userCnt/daily?month=${yearMonth}`);
      return response.data.data;
    } catch (error) {
      console.error('일별 통계 조회 실패:', error);
      return null;
    }
  };