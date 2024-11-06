import React, { useState, useEffect } from 'react';
import { ReportTabs } from '../components/report/ReportTabs';
import { ReportFilters } from '../components/report/ReportFilters';
import { ReportTable } from '../components/report/ReportTable';
import { Pagination } from '../components/report/Pagination';
import { reportApi } from '../api/reports';
import { ReportData, ReportReason } from '../types/report';

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chatmsg' | 'review' | 'meeting'>('chatmsg');
  const [reports, setReports] = useState<ReportData[]>([]);  // 빈 배열로 초기화
  const [reportReasons, setReportReasons] = useState<ReportReason[]>([]); // 빈 배열로 초기화
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('DESC');
  const [sortProperty, setSortProperty] = useState('createdAt');
  const [selectedReason, setSelectedReason] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportReasons = async () => {
      try {
        const reasons = await reportApi.getReportReasons();
        setReportReasons(reasons || []); // 결과가 없으면 빈 배열 사용
        setError(null);
      } catch (error) {
        console.error('Failed to fetch report reasons:', error);
        setReportReasons([]);
        setError('신고 사유 목록을 불러오는데 실패했습니다.');
      }
    };

    fetchReportReasons();
  }, []);

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
        
        setReports(result?.content || []); // 결과가 없으면 빈 배열 사용
        setTotalPages(result?.totalPages || 1);
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

      <ReportFilters
        selectedReason={selectedReason}
        onReasonChange={handleReasonChange}
        sortProperty={sortProperty}
        onSortPropertyChange={handleSortPropertyChange}
        sortDirection={sortDirection}
        onSortDirectionChange={handleSortDirectionChange}
        reportReasons={reportReasons}
      />

      <ReportTable
        reports={reports || []}  // 값이 없으면 빈 배열 전달
        loading={loading}
        reportReasons={reportReasons || []}  // 값이 없으면 빈 배열 전달
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