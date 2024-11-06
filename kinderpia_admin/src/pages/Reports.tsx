import React, { useState, useEffect } from 'react';
import { reportApi } from '../api/reports';
import type { ReportItem, PaginationResponse, PaginationParams } from '../types/types';

const ReportList: React.FC = () => {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paginationInfo, setPaginationInfo] = useState<Omit<PaginationResponse<ReportItem>, 'content'> | null>(null);
  const [params, setParams] = useState<PaginationParams>({
    page: 1,
    size: 10,
    direction: 'DESC',
    property: 'createdAt'
  });

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      try {
        const response = await reportApi.getChatReports(params);
        if (response) {
          const { content, ...paginationData } = response;
          setReports(content);
          setPaginationInfo(paginationData);
        }
      } catch (err) {
        setError('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [params]);

  const handlePageChange = (newPage: number) => {
    setParams(prev => ({ ...prev, page: newPage }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">신고된 채팅 목록</h2>
      
      {/* 테이블 헤더 */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                신고자 ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                신고 사유
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                상태
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                신고일
              </th>
            </tr>
          </thead>
          
          {/* 테이블 본문 */}
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.reporterId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {report.reason}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${report.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 
                        report.status === 'RESOLVED' ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.createdAt}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* 페이지네이션 */}
      {paginationInfo && (
        <div className="mt-4 flex justify-center items-center space-x-2">
          <button
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed
              hover:bg-gray-50 transition-colors duration-200"
            disabled={paginationInfo.first}
            onClick={() => handlePageChange(params.page - 1)}
          >
            이전
          </button>
          
          <span className="px-4 py-2 text-sm text-gray-700">
            {params.page} / {paginationInfo.totalPages}
            <span className="ml-2 text-gray-500">
              (총 {paginationInfo.totalElements}건)
            </span>
          </span>
          
          <button
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed
              hover:bg-gray-50 transition-colors duration-200"
            disabled={paginationInfo.last}
            onClick={() => handlePageChange(params.page + 1)}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default ReportList;