import React, { useState, useEffect } from 'react';

//공통 컴포넌트 호출
import SearchInput from '../../components/common/SearchInput';
import MeetingList from '../../components/common/MeetingList';

//타입 호출
import { MettingListInfo } from '../../types/meetinglist';

// 데이터 호출 - 더미데이터 호출, API 호출
import { dummyMeetingList } from '../../data/tempMeetingListData';

import '../../styles/meeting/MeetingPage.scss';

// 서버 응답 타입 정의
interface SearchResponse {
  meetings: MettingListInfo[];
  total: number;
}

const MeetingPage: React.FC = () => {
  const [meetings, setMeetings] = useState<MettingListInfo[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<MettingListInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filter, setFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 초기 데이터 로드
  useEffect(() => {
    const loadInitialData = () => {
      setMeetings(dummyMeetingList);
      setFilteredMeetings(dummyMeetingList);
    };

    loadInitialData();
    // 실제 API 호출 시:
    // const fetchMeetings = async () => {
    //   try {
    //     const response = await fetch('/api/meetings');
    //     const data = await response.json();
    //     setMeetings(data.meetings);
    //     setFilt eredMeetings(data.meetings);
    //   } catch (error) {
    //     console.error('모임 목록 로드 중 오류 발생:', error);
    //   }
    // };
    // fetchMeetings();
  }, []);

  // 검색어와 필터 변경 시 목록 필터링
  useEffect(() => {
    const filterMeetings = () => {
      let result = [...meetings];

      // 검색어로 필터링
      if (searchTerm) {
        result = result.filter(meeting => 
          meeting.meetingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          meeting.meetingCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
          meeting.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // 모집 상태로 필터링
      if (filter) {
        result = result.filter(meeting => meeting.meetingStatus === '모집중');
      }

      setFilteredMeetings(result);
    };

    filterMeetings();
  }, [meetings, searchTerm, filter]);

  // 검색 핸들러
  const handleSearch = async (term: string) => {
    setIsSearching(true);
    setSearchTerm(term);
    
    try {
      // 실제 API 호출의 경우:
      // const response = await fetch(
      //   `/api/meetings/search?query=${encodeURIComponent(term)}&onlyRecruiting=${filter}`
      // );
      // const data: SearchResponse = await response.json();
      // setMeetings(data.meetings);
      
      // 더미 데이터를 사용한 검색 시뮬레이션
      const searchResults = dummyMeetingList.filter(meeting =>
        meeting.meetingTitle.toLowerCase().includes(term.toLowerCase()) ||
        meeting.meetingCategory.toLowerCase().includes(term.toLowerCase()) ||
        meeting.location.toLowerCase().includes(term.toLowerCase())
      );
      setMeetings(searchResults);
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
      <div className="meeting-search">
        <SearchInput
          placeholder="모임 검색하기"
          onSearch={handleSearch}
          isLoading={isSearching}
        />
      </div>
      <div className='meeting-header'>
        <div className='meeting-header-title'>
          모임 정보
        </div>
        <div className='meeting-header-filter'>
          <label className="filter-checkbox">
            <input 
              type='checkbox'
              checked={filter}
              onChange={handleFilterChange}
            />
            <span>모집중인 모임만 보기</span>
          </label>
        </div>
      </div>
      <hr/>

      {isSearching ? (
        <div className="meeting-search-status">검색 중...</div>
      ) : filteredMeetings.length > 0 ? (
        <div className="meeting-list">
          {filteredMeetings.map((meeting) => (
            <MeetingList
              key={meeting.meetingId}
              meetingId={meeting.meetingId}
              meetingTitle={meeting.meetingTitle}
              meetingCategory={meeting.meetingCategory}
              location={meeting.location}
              meetingTime={meeting.meetingTime}
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