import React, { useEffect, useState } from 'react';
import MeetingList from '../common/MeetingList';
import '../../styles/mypage/MeetingHistory.scss';
import { formatDetailDate } from '../../utils/formatDate';
import { requestHeader } from '../../api/requestHeader';
import { MyInfoProps } from '../../types/user';

export interface MettingListInfo {
  capacity: number;
  createdAt: string;
  district: string;
  meetingCtgName: string;
  meetingId: number;
  meetingLocation: string;
  meetingStatus: string;
  meetingTime: string;
  meetingTitle: string;
  nickname: string;
  totalCapacity: number;
  profileImg: string;
}

interface MeetingResponse {
  data: {
    dataList: MettingListInfo[];
    pageInfo: {
      page: number;
      totalPages: number;
      // 필요한 다른 페이지 정보가 있으면 여기에 추가
    };
  };
}

const MeetingHistory: React.FC<MyInfoProps> = ({ userInfo }) => {
  const [meetings, setMeetings] = useState<MettingListInfo[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 상태
  const [loading, setLoading] = useState(false); // 로딩 상태

  useEffect(() => {
    fetchMeetings();
  }, [filter]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;
      if (bottom && !loading) {
        fetchMeetings(); // 스크롤이 바닥에 도달했을 때 데이터 로드
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  const fetchMeetings = async () => {
    if (loading || page > totalPages) return; // 로딩 중이거나 페이지가 초과하면 종료
    setLoading(true);

    try {
      let response: MeetingResponse;
      switch (filter) {
        case 'all':
          response = await fetchAllMeetings(page);
          break;
        case 'created':
          response = await fetchCreatedMeetings(page);
          break;
        case 'ongoing':
          response = await fetchAllMeetings(page);
          break;
        default:
          return;
      }

      if (response) {
        setMeetings((prevMeetings) => [
          ...prevMeetings,
          ...response.data.dataList,
        ]); // 기존 모임 목록에 새로운 데이터를 추가
        setTotalPages(response.data.pageInfo.totalPages);
        setPage((prevPage) => prevPage + 1); // 다음 페이지로 이동
      }
    } catch (error) {
      console.error('모임 목록 로드 중 오류 발생:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllMeetings = async (page: number): Promise<MeetingResponse> => {
    const response = await requestHeader.get(
      `/api/user/meeting/list?page=${page}&size=10`
    );
    return response.data;
  };

  const fetchCreatedMeetings = async (
    page: number
  ): Promise<MeetingResponse> => {
    const response = await requestHeader.get(
      `/api/user/meeting/leader/list?page=${page}&size=10`
    );
    return response.data;
  };

  return (
    <section id="mymeeting">
      <div className="mymeeting-head">
        <h3>내 모임 내역</h3>
        <div className="filter">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setMeetings([]); // 모임 목록 초기화
              setPage(1); // 페이지 초기화
            }}
          >
            <option value="all">전체</option>
            <option value="created">내가 만든 모임</option>
            <option value="ongoing">모집중인 모임</option>
          </select>
          <span className="xi-angle-down-thin dropdown-icon"></span>
        </div>
      </div>
      <div className="meeting-list">
        {meetings.map((meeting) => (
          <MeetingList
            key={meeting.meetingId}
            meetingId={meeting.meetingId}
            meetingTitle={meeting.meetingTitle}
            meetingCategory={meeting.meetingCtgName}
            createdAt={meeting.createdAt}
            district={meeting.district}
            meetingLocation={meeting.meetingLocation}
            meetingTime={formatDetailDate(meeting.meetingTime)}
            nickname={meeting.nickname}
            capacity={meeting.capacity}
            totalCapacity={meeting.totalCapacity}
            meetingStatus={meeting.meetingStatus}
            profileImg={userInfo?.profileImg || '/images/usericon.png'}
          />
        ))}
      </div>
      {loading && <div className="loading">로딩 중...</div>}{' '}
      {/* 로딩 메시지 추가 */}
    </section>
  );
};

export default MeetingHistory;
