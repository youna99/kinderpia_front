// // MeetingHistory.tsx
// import React, { useEffect, useState } from 'react';

// //타입 호출
// import { MettingListInfo } from '../../types/meetinglist';

// // 데이터 호출 - 더미데이터 호출, API 호출
// import { dummyMeetingList } from '../../data/tempMeetingListData';
// import MeetingList from '../common/MeetingList';

// const MeetingHistory: React.FC = () => {
//   const [meetings, setMeetings] = useState<MettingListInfo[]>([]);

//   useEffect(() => {
//     //더미 미팅 리스트 적용
//     setMeetings(dummyMeetingList);

    // API 호출 통한 미팅리스트 받아오기
  }, []);
  return (
    <div>
      <div>
        <input type="checkbox" name="leader" id="leader" />
        <label htmlFor="leader">내가 만든 모임</label>
      </div>
      {meetings.length > 0 ? (
        <div className="meeting-list-">
          {meetings.map((meeting) => (
            <MeetingList
              // key={meeting.meetingId}
              title={meeting.title}
              category={meeting.category}
              location={meeting.location}
              selectedDate={meeting.selectedDate}
              selectedTime={meeting.selectedTime}
              writer={meeting.writer}
              participants={meeting.participants}
              meetingStatus={meeting.meetingStatus}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
};

// export default MeetingHistory;
import React from 'react';

export default function MeetingHistory() {
  return <div>MeetingHistory</div>;
}
