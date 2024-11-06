import { requestHeader } from './requestHeader';
import { PaginationParams, PaginationResponse, ReportItem, ApiResponse } from '../types/types';
import dayjs from 'dayjs';

const createQueryString = (params: PaginationParams): string => {
  const { page, size, direction, property } = params;
  return `page=${page}&size=${size}&direction=${direction}&property=${property}`;
};

const formatReportDates = (report: ReportItem): ReportItem => ({
  ...report,
  createdAt: dayjs(report.createdAt).format('YYYY-MM-DD HH:mm:ss'),
  updatedAt: dayjs(report.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
});

export const reportApi = {
  // 신고된 채팅 메시지 목록 조회
  getChatReports: async (params: PaginationParams): Promise<PaginationResponse<ReportItem> | null> => {
    try {
      const response = await requestHeader.get<ApiResponse<PaginationResponse<ReportItem>>>(
        `/api/report/chatmsg?${createQueryString(params)}`
      );
      
      return {
        ...response.data.data,
        content: response.data.data.content.map(formatReportDates)
      };
    } catch (error) {
      console.error('신고된 채팅 메시지 목록 조회 실패:', error);
      return null;
    }
  },

  // 신고된 리뷰 목록 조회
  getReviewReports: async (params: PaginationParams): Promise<PaginationResponse<ReportItem> | null> => {
    try {
      const response = await requestHeader.get<ApiResponse<PaginationResponse<ReportItem>>>(
        `/api/report/review?${createQueryString(params)}`
      );
      
      return {
        ...response.data.data,
        content: response.data.data.content.map(formatReportDates)
      };
    } catch (error) {
      console.error('신고된 리뷰 목록 조회 실패:', error);
      return null;
    }
  },

  // 신고된 모임 목록 조회
  getMeetingReports: async (params: PaginationParams): Promise<PaginationResponse<ReportItem> | null> => {
    try {
      const response = await requestHeader.get<ApiResponse<PaginationResponse<ReportItem>>>(
        `/api/report/meeting?${createQueryString(params)}`
      );
      
      return {
        ...response.data.data,
        content: response.data.data.content.map(formatReportDates)
      };
    } catch (error) {
      console.error('신고된 모임 목록 조회 실패:', error);
      return null;
    }
  }
};