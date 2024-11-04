import React, { useEffect, useState } from 'react'

import '../../../styles/meeting/detailpage/MeetingWh.scss';

import StaticMapView from '../../common/StaticMapView';

interface MeetingWhProps{
  meetingLocation? :string;
  meetingTime? : string;
  detailAddress? :string;
}

const MeetingWh: React.FC<MeetingWhProps> = ({
  meetingLocation,
  meetingTime,
  detailAddress
}) => {
  const [formatDateTime, setFormatDateTime] =useState('');

  useEffect(()=>{
    const formatString = (isoString: string): string => {
      const date = new Date(isoString);
      
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
    
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    setFormatDateTime( formatString(meetingTime||''));
  },[meetingTime])
  return (
    <div className='meeting-wh-container'>
      <div className='meeting-wh-header'>
        <div className='meeting-wh-header-title'>모임 일시/장소</div>
      </div>
      <hr className='hr1'/>
      <StaticMapView
        location={detailAddress}
      />
      <div className='meeting-wh-text'>
        <p className='meeting-wh-text-content meeting-where'>
          <span className='meeting-wh-text-content-title'>모임 장소 : </span>{meetingLocation}
        </p>
        <p className='meeting-wh-text-content meeting-when'>
          <span>모임 시간 : </span>{formatDateTime  }
        </p>
      </div>
      <hr className='hr2'/>
    </div>
  )
}

export default MeetingWh;