// components/report/ReportTabs.tsx
interface ReportTabsProps {
  activeTab: string;
  onTabChange: (tab: 'chatMessageId' | 'reviewId' | 'meetingId') => void;
}

export const ReportTabs: React.FC<ReportTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'chatMessageId', label: '채팅 신고' },
    { id: 'reviewId', label: '리뷰 신고' },
    { id: 'meetingId', label: '모임 신고' },
  ];

  return (
    <div className="flex space-x-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === tab.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onTabChange(tab.id as 'chatMessageId' | 'reviewId' | 'meetingId')}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};