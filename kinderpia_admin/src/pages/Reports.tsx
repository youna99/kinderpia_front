import React, { useState, useEffect } from 'react';
import { ReportTabs } from '../components/report/ReportTabs';
import { ReportFilters } from '../components/report/ReportFilters';
import { ReportTable } from '../components/report/ReportTable';
import { Pagination } from '../components/report/Pagination';
import { reportApi } from '../api/reports';
import { ReportData } from '../types/report';

// API 응답 타입 정의
interface ReportResponse {
  data: {
    reportList: ReportData[];
  };
  pageInfo: {
    page: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    sortFields: string[];
    sortDirections: string[];
  };
}

type TabType = 'chatmsg' | 'review' | 'meeting';

const reportReasons = [
  { 
    reportReasonId: 1, 
    reportReasonName: '스팸/광고/홍보', 
  },
  { 
    reportReasonId: 2, 
    reportReasonName: '욕설/혐오/비하',
  },
  { 
    reportReasonId: 3, 
    reportReasonName: '사기/허위정보',
  },
  { 
    reportReasonId: 4, 
    reportReasonName: '개인정보 노출',
  },
  { 
    reportReasonId: 5, 
    reportReasonName: '음란물/유해 컨텐츠',
  },
  { 
    reportReasonId: 6, 
    reportReasonName: '기타',
  }
];

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('chatmsg');
  const [reports, setReports] = useState<ReportResponse>({
    data: { reportList: [] },
    pageInfo: {
      page: 1,
      pageSize: 10,
      totalElements: 0,
      totalPages: 1,
      sortFields: ['createdAt'],
      sortDirections: ['DESC']
    }
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');
  const [sortProperty, setSortProperty] = useState('createdAt');
  const [selectedReason, setSelectedReason] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await reportApi.getReports({
          tab: activeTab,
          page: currentPage,
          direction: sortDirection,
          property: sortProperty,
          reportRsId: selectedReason
        });
        setReports(result);
        setTotalPages(result.pageInfo.totalPages);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
        setReports({
          data: { reportList: [] },
          pageInfo: {
            page: 1,
            pageSize: 10,
            totalElements: 0,
            totalPages: 1,
            sortFields: ['createdAt'],
            sortDirections: ['DESC']
          }
        });
        setTotalPages(1);
        setError('신고 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [activeTab, currentPage, sortDirection, sortProperty, selectedReason]);

  const handleTabChange = (newTab: 'chatMessageId' | 'reviewId' | 'meetingId') => {
    // 탭 ID를 API 엔드포인트에 맞게 변환
    const tabMapping: Record<typeof newTab, TabType> = {
      chatMessageId: 'chatmsg',
      reviewId: 'review',
      meetingId: 'meeting'
    };
    setActiveTab(tabMapping[newTab]);
    setCurrentPage(1);
  };

  const handleReasonChange = (value: string) => {
    setSelectedReason(value);
    setCurrentPage(1);
  };

  const handleSortPropertyChange = (value: string) => {
    setSortProperty(value);
    setCurrentPage(1);
  };

  const handleSortDirectionChange = () => {
    setSortDirection(prev => prev === 'ASC' ? 'DESC' : 'ASC');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">신고 관리</h1>
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">신고 관리</h1>

      <ReportTabs 
        activeTab={activeTab === 'chatmsg' ? 'chatMessageId' : 
                  activeTab === 'review' ? 'reviewId' : 'meetingId'} 
        onTabChange={handleTabChange}
      />

      {/* <ReportFilters
        selectedReason={selectedReason}
        onReasonChange={handleReasonChange}
        sortProperty={sortProperty}
        onSortPropertyChange={handleSortPropertyChange}
        sortDirection={sortDirection}
        onSortDirectionChange={handleSortDirectionChange}
        reportReasons={reportReasons}
      /> */}

      <ReportTable
        reports={reports.data.reportList}
        loading={loading}
        reportReasons={reportReasons}
      />

      {!loading && reports.data.reportList.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Reports;