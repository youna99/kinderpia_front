// services/reportApi.ts
import { ReportData, ReportReason, PaginationResponse } from '../types/report';
import { requestHeader } from './requestHeader';

interface FetchReportsParams {
  tab: 'chatmsg' | 'review' | 'meeting';
  page?: number;
  size?: number;
  direction?: 'ASC' | 'DESC';
  property?: string;
  reportRsId?: string;
}

export const reportApi = {
  getReports: async ({
    tab,
    page = 1,
    size = 10,
    direction = 'DESC',
    property = 'createdAt',
    reportRsId
  }: FetchReportsParams) => {  
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        direction,
        property
      });

      if (reportRsId && reportRsId !== 'all') {
        queryParams.append('reportRsId', reportRsId);
      }

      const response = await requestHeader.get(`/api/report/${tab}?${queryParams}`);
      if (!response) throw new Error('Failed to fetch reports');
      return response.data;
    } catch (error) {
      console.error('Error in getReports:', error);
      throw error;
    }
  },
};