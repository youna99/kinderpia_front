import { useEffect, useState } from "react";
import { ReportData, ReportReason } from "../../types/report";

interface ReportTableProps {
  reports: ReportData[];
  loading: boolean;
  reportReasons: ReportReason[];
}

export const ReportTable: React.FC<ReportTableProps> = ({ reports, loading, reportReasons }) => {
  const [reportList , setReportList] = useState([]);
  const getReportTypeName = (report: ReportData): string => {
    if (report.chatMessageId) return '채팅';
    if (report.reviewId) return '리뷰';
    if (report.meetingId) return '모임';
    return '기타';
  };

  const renderTableBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={7} className="text-center py-4">
            데이터를 불러오는 중...
          </td>
        </tr>
      );
    }


    if (!reports.length) {
      return (
        <tr>
          <td colSpan={7} className="text-center py-4">
            신고 내역이 없습니다.
          </td>
        </tr>
      );
    }

    return reports.map((report) => (
      <tr key={report.reportId} className="hover:bg-gray-50">
        <td className="px-6 py-4 text-sm text-gray-900">
          {new Date(report.createdAt).toLocaleString()}
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">{report.reporterId}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{report.reportedId}</td>
        <td className="px-6 py-4 text-sm text-gray-900">
          {getReportTypeName(report)}
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">
          {reportReasons?.find(r => r.reportReasonId === report.reportReasonId)?.reportReasonName ?? '알 수 없음'}
        </td>
        <td className="px-6 py-4 text-sm text-gray-900 truncate max-w-xs">
          {report.reportMessageContent}
        </td>
      </tr>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">신고일시</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">신고자 ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">피신고자 ID</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">신고유형</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">신고사유</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">신고내용</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {renderTableBody()}
        </tbody>
      </table>
    </div>
  );
};