import React, { useState, useEffect } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/mypage/ScheduleCalender.scss';
import { requestHeader } from '../../api/requestHeader';

type Meeting = {
  id: number;
  title: string;
  meeting_time: string;
};

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface ScheduleCalenderProps {
  userId: number;
}

const ScheduleCalender: React.FC<ScheduleCalenderProps> = ({ userId }) => {
  const [value, onChange] = useState<Value>(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeetings, setSelectedMeetings] = useState<Meeting[]>([]);

  // Fetch meetings data from API
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await requestHeader.get(
          `/api/user/meeting/list/${userId}`
        );
        const fetchedMeetings: Meeting[] = response.data; // API에서 받은 데이터
        setMeetings(fetchedMeetings);

        const today = new Date();
        const todayMeetings = fetchedMeetings.filter(
          (meeting) =>
            new Date(meeting.meeting_time).toDateString() ===
            today.toDateString()
        );
        setSelectedMeetings(todayMeetings);
      } catch (error) {
        console.error('모임 목록을 가져오는 중 오류 발생:', error);
      }
    };
    fetchMeetings();
  }, [userId]);

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const meetingDates = meetings.map((meeting) =>
        new Date(meeting.meeting_time).toDateString()
      );
      return meetingDates.includes(date.toDateString()) ? (
        <div className="meeting-dot" />
      ) : null;
    }
  };

  const onDateClick: CalendarProps['onChange'] = (date) => {
    onChange(date as Value);
    const selectedDate = Array.isArray(date) ? date[0] : date;
    const meetingsForDate = meetings.filter(
      (meeting) =>
        new Date(meeting.meeting_time).toDateString() ===
        selectedDate?.toDateString()
    );
    setSelectedMeetings(meetingsForDate);
  };

  return (
    <div id="calender">
      <h3>내 모임 일정</h3>
      <div className="my-calender">
        <Calendar
          locale="ko"
          onChange={onDateClick}
          value={value}
          tileContent={tileContent}
          formatDay={(locale, date) =>
            date.toLocaleString('en', { day: 'numeric' })
          }
          showNeighboringMonth={false}
          calendarType="hebrew"
          minDetail="year"
          prev2Label={null}
          next2Label={null}
        />
        <div className="meeting-list">
          <h4 className="today-title">
            {new Date(String(value)).toDateString() ===
            new Date().toDateString()
              ? '오늘의 모임 목록'
              : '선택한 날짜의 모임 목록'}
          </h4>
          {selectedMeetings.length > 0 ? (
            <ul>
              {selectedMeetings.map((meeting) => (
                <li key={meeting.id}>
                  {meeting.title} -{' '}
                  {new Date(meeting.meeting_time).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              {new Date(String(value)).toDateString() ===
              new Date().toDateString()
                ? '오늘 날짜에 모임이 없습니다.'
                : '해당 날짜에 모임이 없습니다.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCalender;
