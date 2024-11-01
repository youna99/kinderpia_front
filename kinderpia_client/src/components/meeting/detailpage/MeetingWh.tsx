import React from 'react'

import '../../../styles/meeting/detailpage/MeetingWh.scss';

import StaticMapView from '../../common/StaticMapView';

interface MeetingWhProps{
  location? :string;
  selectedDate? : string;
  selectedTime? : string;
}

const MeetingWh: React.FC<MeetingWhProps> = ({
  location,
  selectedDate,
  selectedTime
}) => {
  return (
    <div className='meeting-wh-container'>
      <div className='meeting-wh-header'>
        <div className='meeting-wh-header-title'>모임 일시/장소</div>
      </div>
      <StaticMapView
        location={location}
      />
      <span className='meeting-wh-where'>모임 잠소 : {location}</span>
      <span className='meeting-wh-when'>모임 시간 : {selectedDate}   {selectedTime}</span>
    </div>
  )
}

export default MeetingWh;