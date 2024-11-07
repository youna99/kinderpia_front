import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MettingListInfo } from '../../types/meetinglist';
import '../../styles/common/MeetingList.scss';
import { getCheckMeetingStatus } from '../../api/meeting';

const MeetingList: React.FC<MettingListInfo> = ({
  meetingId,
  meetingTitle,
  meetingCategory,
  meetingLocation,
  meetingTime,
  nickname,
  district,
  capacity,
  createdAt,
  totalCapacity,
  meetingStatus,
  profileImg,
}) => {
  const [mtStatus, setMtStatus] = useState('ONGOING');
  const navigate = useNavigate();
  
  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      try {
        const data = await getCheckMeetingStatus(meetingId);
        if (isSubscribed) {
          setMtStatus(data.data.meetingStatus);
        }
      } catch (error) {
        if (isSubscribed) {
          console.error('Failed to fetch meeting status:', error);
        }
      }
    };
  
    fetchData();
  
    return () => {
      isSubscribed = false;
    };
  }, [meetingId]);

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
            <p className="meetLocation">{meetingLocation}</p>
            <p className="meetDate">{meetingTime}</p>
          </div>
          <div className="meeting-writer-participants">
            <img
              src={profileImg || '/images/usericon.png'}
              alt=""
              className="leader-img"
            />
            <span className="meetWriter">{nickname}</span>
            <span className="xi-group meeting-icon"></span>
            <span className="meetParticipants">
              {totalCapacity === 99
                ? '제한 없음'
                : `${capacity} / ${totalCapacity}`}
            </span>
          </div>
        </div>
        <div className="meetingStatus-container">
          <span
            className={`meetStatus ${
              mtStatus === 'ONGOING'
                ? 'recruiting'
                : mtStatus === 'COMPLETED'
                ? 'closed'
                : 'ended'
            }`}
          >
            {mtStatus === 'ONGOING' && '모집중'}
            {mtStatus === 'COMPLETED' && '인원마감'}
            {mtStatus === 'END' && '모임종료'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default MeetingList;
