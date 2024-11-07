import React, { useState, useEffect } from 'react';
import { ReportTabs } from '../components/report/ReportTabs';
import { ReportFilters } from '../components/report/ReportFilters';
import { ReportTable } from '../components/report/ReportTable';
import { Pagination } from '../components/report/Pagination';
import { reportApi } from '../api/reports';
import { ReportData } from '../types/report';

const reportReasons = [
  { 
    reportRsId: 1, 
    reportRsName: '스팸/광고/홍보', 
  },
  { 
    reportRsId: 2, 
    reportRsName: '욕설/혐오/비하',
  },
  { 
    reportRsId: 3, 
    reportRsName: '사기/허위정보',
  },
  { 
    reportRsId: 4, 
    reportRsName: '개인정보 노출',
  },
  { 
    reportRsId: 5, 
    reportRsName: '음란물/유해 컨텐츠',
  },
  { 
    reportRsId: 6, 
    reportRsName: '기타',
  }
];

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chatmsg' | 'review' | 'meeting'>('chatmsg');
  const [reports, setReports] = useState<ReportData[]>([]);  // 빈 배열로 초기화
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
        const result = await reportApi.getChatMessageReports({
          page: currentPage,
          direction: sortDirection,
          property: sortProperty,
        });
        
        console.log(result);
        
        // setReports(result?.c || []); // 결과가 없으면 빈 배열 사용
        // setTotalPages(result?.totalPages || 1);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
        setReports([]);
        setTotalPages(1);
        setError('신고 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [activeTab, currentPage, sortDirection, sortProperty, selectedReason]);

  // Event handlers
  const handleTabChange = (tab: 'chatmsg' | 'review' | 'meeting') => {
    setActiveTab(tab);
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
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />

      {/* <ReportFilters
        selectedReason={selectedReason}
        onReasonChange={handleReasonChange}
        sortProperty={sortProperty}
        onSortPropertyChange={handleSortPropertyChange}
        sortDirection={sortDirection}
        onSortDirectionChange={handleSortDirectionChange}
      /> */}

      <ReportTable
        reports={reports || []}  // 값이 없으면 빈 배열 전달
        loading={loading}
        reportReasons={reportReasons}  // 값이 없으면 빈 배열 전달
      />

      {!loading && reports.length > 0 && (
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