import React, { useEffect, useState } from 'react';
import { MettingListInfo } from '../../types/meetinglist';
import axios from 'axios';
import MeetingList from '../common/MeetingList';
import { dummyMeetingList } from '../../data/tempMeetingListData';
import '../../styles/mypage/MeetingHistory.scss';
interface MeetingHistoryProps {
  userId: string | null;
}

const MeetingHistory: React.FC<MeetingHistoryProps> = ({ userId }) => {
  const [meetings, setMeetings] = useState<MettingListInfo[]>([]);
  const [filter, setFilter] = useState<string>('all'); // 기본값을 'all'로 설정

  //더미데이터
  // useEffect(() => {
  //   const loadInitialData = () => {
  //     setMeetings(dummyMeetingList);
  //   };
  //   loadInitialData();
  // }, []);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        if (!userId) return;

        let response;
        if (filter === 'all') {
          response = await axios.get(
            `http://localhost:8080/api/user/meeting/list/${userId}?page=1&size=10`,
            { withCredentials: true }
          );
          console.log('전체모임데이터', response.data);
        } else if (filter === 'created') {
          response = await axios.get(
            `http://localhost:8080/api/user/meeting/leader/list/${userId}`,
            { withCredentials: true }
          );
          console.log('내가만든 모임데이터', response);
        } else if (filter === 'ongoing') {
          const allMeetings = await axios.get(
            `http://localhost:8080/api/user/meeting/list/${userId}`,
            { withCredentials: true }
          );
          console.log('모집중 모임데이터', response);
          response = {
            data: {
              meetings: allMeetings.data.meetings.filter(
                (meeting: MettingListInfo) => meeting.meetingStatus === '모집중'
              ),
            },
          };
        }

        if (response) {
          setMeetings(response.data.data);
        }
      } catch (error) {
        console.error('모임 목록 로드 중 오류 발생:', error);
      }
    };

    fetchMeetings();
  }, [userId, filter]);

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
        {/* {meetings.map((meeting) => (
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
        ))} */}
      </div>
    </section>
  );
};

export default MeetingHistory;
