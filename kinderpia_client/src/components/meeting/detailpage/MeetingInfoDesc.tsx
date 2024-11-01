import React from 'react'
import { MeetingUserData } from '../../../types/meeting';

import '../../../styles/meeting/detailpage/MeetingInfoDesc.scss';

interface MeetingInfoDescProps{
  meetingId? : number;
  createdAt? : string;
  description? : string;
  user? : MeetingUserData
}

const MeetingInfoDesc:React.FC<MeetingInfoDescProps> = ({
  meetingId=1,
  createdAt,
  description,
  user
}) => {

  const report = (meetingId : number) => {

  }
  
  return (
    <div className='meeting-info-desc-container'>
      <div className='meeting-info-desc-header'>
        <label className='meeting-info-desc-header-title'>모임 내용</label>
        <div className='meeting-info-desc-header-report'>
          { user?.isReport 
            ? <div
                onClick={()=>{report(meetingId)}}
              > 신고된 게시물입니다.</div> : <div>🚨 신고하기</div>}
        </div>
      </div>
      <hr/>
      <div className='meeting-info-desc-body'>
        <div className='meeting-info-desc-body-createdAt'>{createdAt}</div>
        <div className='meeting-info-desc-body-content'>{description}</div>
      </div>
    </div>
  )
}

export default MeetingInfoDesc