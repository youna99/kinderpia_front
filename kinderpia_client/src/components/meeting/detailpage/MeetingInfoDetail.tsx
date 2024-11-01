import React, { useEffect, useState } from 'react'

// 스타일 호출
import '../../../styles/meeting/detailpage/MeetingInfoDetail.scss';

interface MeetingInfoDetailProps{
  category? : string;
  title? : string;
  writer? : string;
  participants? : number;
  maxParticipants? : number;
  JoinMethod? :boolean;
  meetingStatus? : string;
}

const MeetingInfoDetail:React.FC<MeetingInfoDetailProps> = ({
  category,
  title,
  writer,
  participants,
  maxParticipants,
  JoinMethod,
  meetingStatus,
}) => {
  const [hashText, setHashText]= useState('');

  useEffect(()=>{
    if(JoinMethod){
      setHashText('승인 후 참가 가능');
    }else{
      setHashText('누구나 참가 가능');
    }
  },[JoinMethod])


  return (
    <div className='meeting-info-detail-container'>
      <div className='meeting-info-detail-coverImage'>
      </div>
      <span className='meeting-info-detail-category'>
        {category}
      </span>
      <div className='meeting-info-detail-wrapper'>
        <div className='meeting-info-detail-wrapper-title'>
          {title}
        </div>
        <div className='meeting-info-detail-wrapper-human'>
          <div className='meeting-info-detail-wrapper-human-writer'>
            <div className='meeting-info-detail-wrapper-human-writer-profileImage'>

            </div>
            <div className='meeting-info-detail-wrapper-human-writer-name'>
              {writer}
            </div>
          </div>
          <div className='meeting-info-detail-wrapper-human-participants'>
            <span className="xi-users meeting-info-detail-wrapper-human-participants-icon"></span>{participants}/{maxParticipants}
          </div>
        </div>
        <div className='meeting-info-detail-wrapper-hash'>
          <span className="hash-tag">#{meetingStatus}</span>
          <span className="hash-tag">#{hashText}</span>
        </div>
      </div>
    </div>
  )
}

export default MeetingInfoDetail
