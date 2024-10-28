import React, { useState, useEffect } from 'react';

//공통 컴포넌트 호출
import SearchInput from '../../components/common/SearchInput';
import MeetingList from '../../components/common/MeetingList';

//타입 호출
import { MettingListInfo } from '../../types/meetinglist';

// 데이터 호출 - 더미데이터 호출, API 호출
import { dummyMeetingList } from '../../data/tempMeetingListData';

// 서버 응답 타입 정의
interface SearchResponse {
  meetings: MettingListInfo[];
  total: number;
}

const MeetingPage: React.FC = () => {
  const [meetings, setMeetings] = useState<MettingListInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {

    //더미 미팅 리스트 적용
    setMeetings(dummyMeetingList);

    // API 호출 통한 미팅리스트 받아오기

  }, []);

  const handleSearch = async (searchTerm: string) => {
    setIsSearching(true);
    try {
      const response = await fetch(`/api/meetings/search?query=${encodeURIComponent(searchTerm)}`);
      const data: SearchResponse = await response.json();
      setMeetings(data.meetings);
    } catch (error) {
      console.error('모임 검색 중 오류 발생:', error);
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
            <MeetingList
              // key={meeting.meetingId}
              title={meeting.title}
              category={meeting.category}
              location={meeting.location}
              selectedDate={meeting.selectedDate}
              selectedTime={meeting.selectedTime}
              writer={meeting.writer}
              participants={meeting.participants}
              meetingStatus={meeting.meetingStatus}
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