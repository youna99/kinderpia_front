// services/reportApi.ts
import { ReportData, ReportReason, PaginationResponse } from '../types/report';

interface FetchReportsParams {
  tab: 'chatmsg' | 'review' | 'meeting';
  page: number;
  size?: number;
  direction: 'ASC' | 'DESC';
  property: string;
  reportRsId?: string;
}

export const reportApi = {
  // 신고 사유 목록 조회
  getReportReasons: async (): Promise<ReportReason[]> => {
    try {
      const response = await fetch('/api/report/reasons');
      if (!response.ok) throw new Error('Failed to fetch report reasons');
      return await response.json();
    } catch (error) {
      console.error('Error in getReportReasons:', error);
      throw error;
    }
  },

  // 신고 목록 조회
  getReports: async ({
    tab,
    page,
    size = 10,
    direction,
    property,
    reportRsId
  }: FetchReportsParams): Promise<PaginationResponse> => {
    try {
      let url = `/api/report/${tab}?page=${page}&size=${size}&direction=${direction}&property=${property}`;
      if (reportRsId && reportRsId !== 'all') {
        url += `&reportRsId=${reportRsId}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch reports');
      return await response.json();
    } catch (error) {
      console.error('Error in getReports:', error);
      throw error;
    }
  },

  // 신고 상세 정보 조회 (아직 미구현된 기능)
  getReportDetail: async (reportId: number): Promise<ReportData> => {
    try {
      const response = await fetch(`/api/report/${reportId}`);
      if (!response.ok) throw new Error('Failed to fetch report detail');
      return await response.json();
    } catch (error) {
      console.error('Error in getReportDetail:', error);
      throw error;
    }
  },

  // 신고 처리 (아직 미구현된 기능)
  processReport: async (reportId: number, action: 'approve' | 'reject', reason?: string) => {
    try {
      const response = await fetch(`/api/report/${reportId}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, reason }),
      });
      if (!response.ok) throw new Error('Failed to process report');
      return await response.json();
    } catch (error) {
      console.error('Error in processReport:', error);
      throw error;
    }
  }
};