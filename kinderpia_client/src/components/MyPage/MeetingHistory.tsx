import React, { useEffect, useState } from 'react';
import MeetingList from '../common/MeetingList';
import '../../styles/mypage/MeetingHistory.scss';
import { formatDetailDate } from '../../utils/formatDate';
import { requestHeader } from '../../api/requestHeader';
interface MeetingHistoryProps {
  userInfo: {
    userId: string | null;
    profileImg?: string;
    nickname?: string;
  } | null;
}

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

const MeetingHistory: React.FC<MeetingHistoryProps> = ({ userInfo }) => {
  const [meetings, setMeetings] = useState<MettingListInfo[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        if (!userInfo) return;

        let response;
        if (filter === 'all') {
          response = await requestHeader.get(
            `/api/user/meeting/list?page=1&size=10`
          );
          console.log('전체모임데이터', response.data);
        } else if (filter === 'created') {
          response = await requestHeader.get(
            `/api/user/meeting/leader/list?page=1&size=10`
          );
          console.log('내가만든 모임데이터', response.data);
        } else if (filter === 'ongoing') {
          const allMeetings = await requestHeader.get(
            `/api/user/meeting/list?page=1&size=10`
          );
          console.log('모집중인 모임데이터', allMeetings.data.data.dataList);

          const ongoingMeetings = allMeetings.data.data.dataList.filter(
            (meeting: MettingListInfo) => meeting.meetingStatus === 'ONGOING'
          );
          response = {
            data: {
              data: {
                dataList: ongoingMeetings,
                pageInfo: allMeetings.data.data.pageInfo,
              },
            },
          };
          console.log('모집중필터 모임데이터', response.data);
        }
        if (response) {
          setMeetings(response.data.data.dataList);
        }
      } catch (error) {
        console.error('모임 목록 로드 중 오류 발생:', error);
      }
    };

    fetchMeetings();
  }, [userInfo, filter]);

  console.log(meetings);

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
