import React, { useState } from 'react';
import SearchInput from '../../components/common/SearchInput';
import MeetingCard from '../../components/meeting/MeetingCard';
import { MeetingData } from '../../types/meeting';

// 서버 응답 타입 정의
interface SearchResponse {
  meetings: MeetingData[];
  total: number;
}

const MeetingPage: React.FC = () => {
  const [meetings, setMeetings] = useState<MeetingData[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchTerm: string) => {
    setIsSearching(true);
    try {
      const response = await fetch(`/api/meetings/search?query=${encodeURIComponent(searchTerm)}`);
      const data: SearchResponse = await response.json();
      setMeetings(data.meetings);
    } catch (error) {
      console.error('모임 검색 중 오류 발생:', error);
      // 에러 처리 로직 추가 (예: 토스트 메시지)
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="meeting-page">
      <div className="meeting-search">
        <SearchInput
          placeholder="모임 검색하기"
          onSearch={handleSearch}
          isLoading={isSearching}
        />
      </div>
      
      {isSearching ? (
        <div className="meeting-search-status">검색 중...</div>
      ) : meetings.length > 0 ? (
        <div className="meeting-list-">
          {meetings.map((meeting) => (
            <MeetingCard
              key={meeting.id}
              meetingTitle={meeting.title}
              meetingCategory={meeting.category}
              meetingLocation={meeting.location}
              meetingDate={(meeting.selectedDate+meeting.selectedTime)}
              meetingWriter={meeting.writer}
              meetingParticipate={meeting.participants}
              meetingParticipateLimit={meeting.maxParticipants}
              onChange={() => {}}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

export default MeetingPage;