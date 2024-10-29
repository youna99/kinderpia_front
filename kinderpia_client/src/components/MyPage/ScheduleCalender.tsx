// 해당 유저의 모임목록 받아오기
// 모임목록에서 모임 일시(meeting_time)
import React, { useState, useEffect } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../styles/mypage/ScheduleCalender.scss';

// Sample Meeting Type
type Meeting = {
  id: number;
  title: string;
  meeting_time: string;
};

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// Calendar component
export default function ScheduleCalender() {
  const [value, onChange] = useState<Value>(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([]); //모임목록data
  const [selectedMeetings, setSelectedMeetings] = useState<Meeting[]>([]); //선택된 날짜 모임목록

  // Fetch meetings data from API
  useEffect(() => {
    const fetchMeetings = async () => {
      const fetchedMeetings: Meeting[] = [
        { id: 1, title: 'Meeting A', meeting_time: '2024-10-30T10:00:00' },
        { id: 2, title: 'Meeting B', meeting_time: '2024-10-30T15:00:00' },
        { id: 3, title: 'Meeting C', meeting_time: '2024-11-01T10:00:00' },
      ];
      setMeetings(fetchedMeetings);

      const today = new Date();
      const todayMeetings = fetchedMeetings.filter(
        (meeting) =>
          new Date(meeting.meeting_time).toDateString() === today.toDateString()
      );
      setSelectedMeetings(todayMeetings);
    };
    fetchMeetings();
  }, []);

  // 오늘 모임목록 있으면 달력에 표시하기
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

  // 날짜 선택 ->해당 날짜 모임 가져오기
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
}
