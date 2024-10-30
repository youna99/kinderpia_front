import React from 'react'
import { MeetingData } from '../../../types/meeting'

interface MeetingInfoProps{
  data? : MeetingData
}

const MeetingInfo:React.FC<MeetingInfoProps> = ({
  data
}) => {

  return (
    <div className='meeting-info-container'>
      
    </div>
  )
}

export default MeetingInfo