import React, { useState, useEffect } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/mypage/ScheduleCalender.scss';
import { getUserMeetingScheduleList } from '../../api/user';
import { Link } from 'react-router-dom';

type Meeting = {
  meetingId: string | null;
  meetingTitle: string;
  meetingTime: string;
};

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const ScheduleCalender: React.FC = () => {
  const [value, onChange] = useState<Value>(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [selectedMeetings, setSelectedMeetings] = useState<Meeting[]>([]);

  const fetchMeetings = async () => {
    try {
      const response = await getUserMeetingScheduleList();
      const fetchedMeetings: Meeting[] = response.data.data;
      setMeetings(fetchedMeetings);
      const today = new Date();
      const todayMeetings = fetchedMeetings.filter(
        (meeting) =>
          new Date(meeting.meetingTime).toDateString() === today.toDateString()
      );
      setSelectedMeetings(todayMeetings);
    } catch (error) {
      console.error('모임 목록을 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      const meetingDates = meetings.map((meeting) =>
        new Date(meeting.meetingTime).toDateString()
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
        new Date(meeting.meetingTime).toDateString() ===
        selectedDate?.toDateString()
    );
    setSelectedMeetings(meetingsForDate);
  };
  // <Route path="meeting/:meetingId" element={<MeetingDetail />} />

  return (
    <div id="calender">
      <h3>내 모임 일정</h3>
      <div className="my-calender">
        <div className="calender-box">
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
        </div>
        <div className="meeting-list">
          <h4 className="today-title">
            <i className="xi-calendar-check"></i>
            {new Date(String(value)).toDateString() ===
            new Date().toDateString()
              ? '오늘의 모임 목록'
              : `${new Date(String(value)).toLocaleDateString('ko-KR', {
                  month: 'long',
                  day: 'numeric',
                })} 모임 목록`}
          </h4>
          {selectedMeetings.length > 0 ? (
            <ul>
              {selectedMeetings.map((meeting) => (
                <li key={meeting.meetingId}>
                  <Link
                    to={`/meeting/${meeting.meetingId}`}
                    className="today-meeting"
                  >
                    <span className="meeting-title">
                      <i className="xi-label"></i>
                      {meeting.meetingTitle}
                    </span>{' '}
                    <span className="today-mettingtime">
                      <i className="xi-time-o"></i>
                      {new Date(meeting.meetingTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </Link>
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
