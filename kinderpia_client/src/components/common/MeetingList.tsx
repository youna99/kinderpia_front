import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MettingListInfo } from '../../types/meetinglist';
import '../../styles/common/MeetingList.scss';

const MeetingList: React.FC<MettingListInfo> = ({
  meetingId,
  meetingTitle,
  meetingCategory,
  location,
  meetingTime,
  writer,
  participants,
  meetingStatus,
}) => {
  const navigate = useNavigate();

  const buttonCanSendYouThere = (id: number) => {
    navigate(`/meeting/${id}`);
  };
  return (
    <section
      onClick={() => {
        buttonCanSendYouThere(meetingId);
      }}
    >
      <div className="meeting-container">
        <div className="meetingInfo-container">
          <span className="category">{meetingCategory}</span>
          <h3 className="meeting-title">{meetingTitle}</h3>
          <div className="meetingInfo">
            <p className="meetLocation">{location}</p>
            <p className="meetDate">{meetingTime}</p>
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
              meetingStatus === 'ONGOING' ? 'recruiting' : 'closed'
            }`}
          >
            {meetingStatus === 'ONGOING' && '모집중'}
            {meetingStatus === 'COMPLETED' && '인원마감'}
            {meetingStatus === 'END' && '모임종료'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default MeetingList;
