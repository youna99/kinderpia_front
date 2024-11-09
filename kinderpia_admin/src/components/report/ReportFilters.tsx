import { ReportReason } from "../../types/report";

// components/report/ReportFilters.tsx
interface ReportFiltersProps {
  selectedReason: string;
  onReasonChange: (value: string) => void;
  sortProperty: string;
  onSortPropertyChange: (value: string) => void;
  sortDirection: 'ASC' | 'DESC';
  onSortDirectionChange: () => void;
  reportReasons: ReportReason[];
}

export const ReportFilters: React.FC<ReportFiltersProps> = ({
  selectedReason,
  onReasonChange,
  sortProperty,
  onSortPropertyChange,
  sortDirection,
  onSortDirectionChange,
  reportReasons
}) => {
  return (
    <div className="flex justify-between mb-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">신고 사유:</span>
        <select
          value={selectedReason}
          onChange={(e) => onReasonChange(e.target.value)}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
        >
          <option value="all">전체</option>
          {reportReasons?.map((reason) => (
            <option key={reason.reportReasonId} value={String(reason.reportReasonId)}>
              {reason.reportReasonName}
            </option>
          ))}
        </select>
      </div>
      <div className="flex space-x-2">
        <select
          value={sortProperty}
          onChange={(e) => onSortPropertyChange(e.target.value)}
          className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
        >
          <option value="createdAt">신고일시</option>
          <option value="reportRsId">신고사유</option>
        </select>
        <button
          onClick={onSortDirectionChange}
          className="px-3 py-2 border rounded hover:bg-gray-50"
        >
          {sortDirection === 'ASC' ? '오름차순' : '내림차순'}
        </button>
      </div>
    </div>
  );
};
