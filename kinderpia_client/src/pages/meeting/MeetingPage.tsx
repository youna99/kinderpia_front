import React, { useState, useEffect, useRef, useCallback } from 'react';
import SearchInput from '../../components/common/SearchInput';
import MeetingList from '../../components/common/MeetingList';
import { MettingListInfo } from '../../types/meetinglist';
import { getMeetingList, getMeetingListOpen, getMeetingListSearch } from '../../api/meetinglist';
import { formatDetailDate } from '../../utils/formatDate';
import '../../styles/meeting/MeetingPage.scss';

const MeetingPage: React.FC = () => {
  const [meetings, setMeetings] = useState<MettingListInfo[]>([]);
  const [filteredMeetings, setFilteredMeetings] = useState<MettingListInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filter, setFilter] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  const currentSearchTerm = useRef('');
  
  const observer = useRef<IntersectionObserver>();
  const lastMeetingElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      
      if (observer.current) observer.current.disconnect();
      
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const fetchMeetings = async (pageNum: number, isInitial: boolean = false) => {
    try {
      setIsLoading(true);
      const response = await getMeetingListOpen({
        page: pageNum,
        size: 10,
        keyword: currentSearchTerm.current,
      });
  
      if (!response) {
        if (isInitial) {
          setMeetings([]);
        }
        setHasMore(false);
        return;
      }
  
      const newMeetings = response.data.dataList;
      const pageInfo = response.data.pageInfo;
      
      // 현재 페이지가 마지막 페이지인지 체크
      if (pageInfo?.page === pageInfo?.totalPages) {
        setHasMore(false);
      }
  
      if (!newMeetings || newMeetings.length === 0) {
        if (isInitial) {
          setMeetings([]);
        }
        setHasMore(false);
        return;
      }
  
      setMeetings(prev => 
        isInitial ? newMeetings : [...prev, ...newMeetings]
      );
      setError(null);
    } catch (error) {
      console.error('모임 목록 로드 중 오류 발생:', error);
      setError('모임 목록을 불러오는데 실패했습니다.');
      if (isInitial) {
        setMeetings([]);
      }
    } finally {
      setIsLoading(false);
      if (isInitial) {
        setIsInitialLoad(false);
      }
    }
  };

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setIsInitialLoad(true);
    fetchMeetings(1, true);
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchMeetings(page);
    }
  }, [page]);

  useEffect(() => {
    let result = [...meetings];

    if (filter) {
      result = result.filter(
        (meeting) => meeting.meetingStatus === 'ONGOING'
      );
    }

    setFilteredMeetings(result);
  }, [meetings, filter]);

  const handleSearch = async (searchTerm: string) => {
    setIsSearching(true);
    currentSearchTerm.current = searchTerm;
    
    // 검색 시작 시 상태 초기화
    setMeetings([]); 
    setPage(1);
    setHasMore(true);
    setIsInitialLoad(true);
    
    try {
      const response = await getMeetingList({
        keyword: searchTerm,
        page: 1,
        size: 10
      });
  
      if (!response) {
        setHasMore(false);
        return;
      }
  
      const newMeetings = response.data.dataList;
      const pageInfo = response.data.pageInfo;
      
      if (pageInfo?.totalPages === 1) {
        setHasMore(false);
      }
  
      setMeetings(newMeetings);
      setError(null);
    } catch (error) {
      console.error('모임 검색 중 오류 발생:', error);
      setError('모임 검색에 실패했습니다.');
      setMeetings([]);
    } finally {
      setIsSearching(false);
      setIsInitialLoad(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.checked);
  };

  const getNoResultsMessage = () => {
    // 로딩 중이거나 초기 로딩 중에는 메시지를 표시하지 않음
    if (isLoading || isInitialLoad) return null;
    
    // 검색어가 있고 데이터가 없는 경우에만 메시지 표시
    if (currentSearchTerm.current && !meetings.length) {
      return '검색 결과가 없습니다.';
    }
    
    // 검색어가 없고 데이터가 없는 경우
    if (!currentSearchTerm.current && !meetings.length) {
      return '등록된 모임이 없습니다.';
    }
    
    return null;
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
            {filter?<span>모집중인 모임만 보기</span>:<span>모든 모임 보기</span>}
          </label>
        </div>
      </div>
      <hr />

      {error ? (
        <div className="meeting-error">{error}</div>
      ) : (
        <div className="meeting-list">
          {filteredMeetings.map((meeting, index) => (
            <div
              key={meeting.meetingId}
              ref={
                index === filteredMeetings.length - 1
                  ? lastMeetingElementRef
                  : null
              }
            >
              <MeetingList
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
                profileImg={meeting.profileImg}
              />
            </div>
          ))}
          {isLoading && (
            <div className="loading-indicator">데이터를 불러오는 중...</div>
          )}
          {!isLoading && getNoResultsMessage() && (
            <div className="meeting-404">
              {getNoResultsMessage()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MeetingPage;