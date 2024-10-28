import React from 'react';
import { MettingListInfo } from '../../types/meetinglist';
import '../../styles/MeetingList.scss';

const MeetingList: React.FC<MettingListInfo> = ({
  title,
  category,
  location,
  selectedDate,
  selectedTime,
  writer,
  participants,
  meetingStatus,
}) => {
  return (
    <section>
      <div className="meeting-container">
        <div className="meetingInfo-container">
          <span className="category">{category}</span>
          <h3 className="meeting-title">{title}</h3>
          <div className="meetingInfo">
            <p className="meetLocation">{location}</p>
            <p className="meetDate">{selectedDate}</p>
            <p className="meetTime">{selectedTime}</p>
          </div>
          <div className="meeting-writer-participants">
            <span className="meetWriter">{writer}</span>
            <span className="meetParticipants">{participants}</span>
          </div>
        </div>
        <div className="meetingStatus-container">
          <span className="meetStatus">{meetingStatus}</span>
        </div>
      </div>
    </section>
  );
};

export default MeetingList;
