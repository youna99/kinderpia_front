import React, { useState, useEffect } from 'react'
import CommonButton1 from '../../common/CommonButton1'

import '../../../styles/meeting/detailpage/MeetingActionJoin.scss';
import { MeetingData, MeetingJoinData } from '../../../types/meeting';

interface MeetingActionJoinProps {
  data?: MeetingData,
  onSubmit: (count: number, data:MeetingJoinData) => void
}

const MeetingActionJoin: React.FC<MeetingActionJoinProps> = ({ 
  data,
  onSubmit 
}) => {
  const [count, setCount] = useState<number>(1)
  const [maxCount, setMaxCount] = useState(1);

  useEffect(() => {
    if (data?.totalCapacity && data?.participants) {
      const availableCount = data.totalCapacity - data.participants;
      setMaxCount(Math.max(1, availableCount));
    }
  }, [data]);
  
  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  const handleIncrease = () => {
    if (count < maxCount) {
      setCount(count + 1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= maxCount) {
      setCount(value)
    }
  }

  const handleSubmit = async (): Promise<void> => {
    const capacity = count;
    const meetingId = data?.meetingId || 0;
    onSubmit(meetingId, {capacity})
  }

  return (
    <div className='meeting-action-join-container'>
      <div className='meeting-action-join-participate'>
        <span>참가할 인원</span>
        <button onClick={handleDecrease}>-</button>
        <input 
          type="number" 
          value={count} 
          onChange={handleInputChange}
          max={maxCount}
          min="1"
        />
        <button onClick={handleIncrease}>+</button>
      </div>
      <div className='meeting-action-join-btn'>
        <CommonButton1
          text='참가 신청하기'
          onClick={handleSubmit}  
        />
      </div>
    </div>
  )
}

export default MeetingActionJoin;