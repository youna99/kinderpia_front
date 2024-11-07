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

const MeetingHistory: React.FC<MyInfoProps> = ({ userInfo }) => {
  const [meetings, setMeetings] = useState<MettingListInfo[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [page, setPage] = useState(1); // 현재 페이지 상태
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수 상태

  useEffect(() => {
    const fetchMeetings = async () => {
      if (!userInfo) return;

      try {
        let response;
        switch (filter) {
          case 'all':
            response = await fetchAllMeetings(page);
            break;
          case 'created':
            response = await fetchCreatedMeetings(page);
            break;
          case 'ongoing':
            response = await fetchOngoingMeetings(page);
            break;
          default:
            break;
        }

        if (response) {
          setMeetings(response);
        }
      } catch (error) {
        console.error('모임 목록 로드 중 오류 발생:', error);
      }
    };

    fetchMeetings();
  }, [userInfo, filter, page]);

  const fetchAllMeetings = async (page: number) => {
    const response = await requestHeader.get(
      `/api/user/meeting/list?page=${page}&size=10`
    );
    console.log('전체모임데이터', response.data.data.dataList);
    return response.data.data.dataList;
  };

  const fetchOngoingMeetings = async (page: number) => {
    const allMeetings = await fetchAllMeetings(page);
    const filteredOngoingMeetings = await allMeetings.data.data.dataList.filter(
      (meeting: MettingListInfo) => meeting.meetingStatus === 'ONGOING'
    );
    console.log(filteredOngoingMeetings);
  };

  const fetchCreatedMeetings = async (page: number) => {
    const response = await requestHeader.get(
      `/api/user/meeting/leader/list?page=${page}&size=10`
    );
    console.log('내가만든 모임데이터', response.data.data.dataList);
    return response.data.data.dataList;
  };

  return (
    <section id="mymeeting">
      <div className="mymeeting-head">
        <h3>내 모임 내역</h3>
        <div className="filter">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">전체</option>
            <option value="ongoing">모집 중인 모임</option>
            <option value="created">내가 만든 모임</option>
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
    </section>
  );
};

export default MeetingHistory;
