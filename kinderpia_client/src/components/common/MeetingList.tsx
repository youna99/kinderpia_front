import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MettingListInfo } from '../../types/meetinglist';
import '../../styles/MeetingList.scss';

const MeetingList: React.FC<MettingListInfo> = ({
  meetingId,
  title,
  category,
  location,
  selectedDate,
  selectedTime,
  writer,
  participants,
  meetingStatus,
}) => {
  const navigate = useNavigate();
  
  const buttonCanSendYouThere = ( id : number)=>{
    navigate(`/meeting/${id}`);
  };
  return (
    <section
      onClick={()=>{buttonCanSendYouThere(meetingId)}}
    >
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
            <span className="xi-group meeting-icon"></span>
            <span className="meetParticipants">{participants} 명 참여</span>
          </div>
        </div>
        <div className="meetingStatus-container">
          <span
            className={`meetStatus ${
              meetingStatus === '모집중' ? 'recruiting' : 'closed'
            }`}
          >
            {meetingStatus}
          </span>
        </div>
      </div>
    </section>
  );
};

export default MeetingList;
