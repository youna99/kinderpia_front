import React, { useState, useEffect } from 'react';

//공통 컴포넌트 호출
import SearchInput from '../../components/common/SearchInput';
import MeetingList from '../../components/common/MeetingList';

//타입 호출
import { MettingListInfo } from '../../types/meetinglist';

// // 데이터 호출 - 더미데이터 호출, API 호출
// import { dummyMeetingList } from '../../data/tempMeetingListData';

import '../../styles/meeting/MeetingPage.scss';
import { meetingApi } from '../../api/meeting';
import { getMeetingListOpen, getMeetingList } from '../../api/meetinglist';
import { formatDetailDate } from '../../utils/formatDate';

// 서버 응답 타입 정의
interface SearchResponse {
  meetings: MettingListInfo[];
  total: number;
}

const MeetingPage: React.FC = () => {
  // 빈 배열로 초기화하여 undefined 방지
  const [meetings, setMeetings] = useState<MettingListInfo[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<MettingListInfo[]>(
    []
  );
  const [isSearching, setIsSearching] = useState(false);
  const [filter, setFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await getMeetingListOpen({});

        if (!response || !response.data.dataList) {
          throw new Error('Invalid response format');
        }

        setMeetings(response.data.dataList);
        setFilteredMeetings(response.data.dataList);

        setError(null);
      } catch (error) {
        console.error('모임 목록 로드 중 오류 발생:', error);
        setError('모임 목록을 불러오는데 실패했습니다.');
        setMeetings([]);
        setFilteredMeetings([]);
      }
    };
    fetchMeetings();
  }, []);

  useEffect(() => {
    const filterMeetings = () => {
      let result = [...(meetings || [])];

      if (searchTerm) {
        result = result.filter(
          (meeting) =>
            meeting.meetingTitle
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            meeting.meetingCategory
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            meeting.meetingLocation
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
      }

      if (filter) {
        result = result.filter(
          (meeting) => meeting.meetingStatus === 'ONGOING'
        );
      }

      setFilteredMeetings(result);
    };

    filterMeetings();
  }, [meetings, searchTerm, filter]);
  // 검색 핸들러
  const handleSearch = async (term: string) => {
    setIsSearching(true);
    setSearchTerm(term);
    console.log(1);

    try {
      console.log(2);
      const response = await fetch(
        `/api/meetings/search?query=${encodeURIComponent(
          term
        )}&onlyRecruiting=${filter}`
      );
      console.log(3);
      const data: SearchResponse = await response.json();
      console.log(4);
      setMeetings(data.meetings);
    } catch (error) {
      console.error('모임 검색 중 오류 발생:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // 필터 변경 핸들러
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.checked);
  };

  return (
    <div className="meeting-page">
      <strong className="page-banner-txt">
        "함께하는 즐거움", 모임을 찾아보세요!
      </strong>
      <div className="meeting-search">
        <SearchInput
          placeholder="모임 검색하기"
          onSearch={handleSearch}
          isLoading={isSearching}
        />
      </div>
      <div className="meeting-header">
        <div className="meeting-header-title">모임 정보</div>
        <div className="meeting-header-filter">
          <label className="filter-checkbox">
            <input
              type="checkbox"
              checked={filter}
              onChange={handleFilterChange}
            />
            <span>모집중인 모임만 보기</span>
          </label>
        </div>
      </div>
      <hr />

      {error ? (
        <div className="meeting-error">{error}</div>
      ) : isSearching ? (
        <div className="meeting-search-status">검색 중...</div>
      ) : filteredMeetings.length > 0 ? (
        <div className="meeting-list">
          {filteredMeetings.map((meeting) => (
            <MeetingList
              key={meeting.meetingId}
              meetingId={meeting.meetingId}
              meetingTitle={meeting.meetingTitle}
              meetingCategory={meeting.meetingCategory}
              meetingLocation={meeting.meetingLocation}
              createdAt={meeting.createdAt}
              district={meeting.district}
              meetingTime={formatDetailDate(meeting.meetingTime)}
              nickname={meeting.nickname}
              capacity={meeting.capacity}
              totalCapacity={meeting.totalCapacity}
              meetingStatus={meeting.meetingStatus}
            />
          ))}
        </div>
      ) : (
        <div className="meeting-404">
          {searchTerm ? '검색 결과가 없습니다.' : '등록된 모임이 없습니다.'}
        </div>
      )}
    </div>
  );
};

export default MeetingPage;
