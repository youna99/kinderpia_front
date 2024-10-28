import React from 'react';
import '../../styles/meeting/MeetingCard.scss';

interface MeetingCardProps {
  meetingTitle: string;
  meetingCategory: string;
  meetingLocation: string;
  meetingDate: string;
  meetingWriter: string;
  meetingParticipate: number;
  meetingParticipateLimit: number;
  onChange: (value: string) => void;
}

const MeetingCard: React.FC<MeetingCardProps> = ({
  meetingTitle,
  meetingCategory,
  meetingLocation,
  meetingDate,
  meetingWriter,
  meetingParticipate,
  meetingParticipateLimit,
  onChange
}) => {
  const isFullyBooked = meetingParticipate >= meetingParticipateLimit;
  
  return (
    <div className='meeting-card'>
      <div className='meeting-info-box'>
        <div className='meeting-info-category'>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {meetingCategory}
          </span>
        </div>
        
        <div className='meeting-info-title'>
          <h3 className="text-xl font-bold truncate">{meetingTitle}</h3>
        </div>
        
        <div className='meeting-info-locationdate-wrapper'>
          <div className='meeting-info-location'>
            <i className="fas fa-map-marker-alt mr-2"></i>
            {meetingLocation}
          </div>
          <div className='meeting-info-date'>
            <i className="far fa-calendar-alt mr-2"></i>
            {meetingDate}
          </div>
        </div>
        
        <div className='meeting-info-user-wrapper'>
          <div className='meeting-info-writer'>
            <i className="far fa-user mr-2"></i>
            주최자 : {meetingWriter}
          </div>
          <div className='meeting-info-participate'>
            <span className={`${isFullyBooked ? 'text-red-500' : 'text-green-500'}`}>
              {meetingParticipate} / {meetingParticipateLimit} 명
            </span>
          </div>
        </div>
      </div>
      
      <div className={`meeting-status ${isFullyBooked ? 'bg-red-100' : 'bg-green-100'}`}>
        {isFullyBooked ? '모집완료' : '모집중'}
      </div>
    </div>
  );
};

export default MeetingCard;