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
      <hr/>
      <StaticMapView
        location={location}
      />
      <div className='meeting-wh-text'>
        <p className='meeting-wh-text-content meeting-where'>
          <span className='meeting-wh-text-content-title'>모임 장소 : </span>{location}
        </p>
        <p className='meeting-wh-text-content meeting-when'>
          <span>모임 시간 : </span>{selectedDate}   {selectedTime}
        </p>
      </div>
    </div>
  )
}

export default MeetingWh;