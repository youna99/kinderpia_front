import React from 'react'
import { MeetingUserData } from '../../../types/meeting'

interface MeetingActionProps{
  data? : MeetingUserData
}

const MeetingAction:React.FC<MeetingActionProps> = ({
  data
}) => {
  return (
    <div className='meeting-action-container'>
      
    </div>
  )
}

export default MeetingAction