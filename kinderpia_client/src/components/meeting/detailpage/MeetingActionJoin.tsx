import React, { useState } from 'react'

interface MeetingActionJoinProps {
  onSubmit: (count: number) => void
}

const MeetingActionJoin: React.FC<MeetingActionJoinProps> = ({ onSubmit }) => {
  const [count, setCount] = useState<number>(1)

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  const handleIncrease = () => {
    setCount(count + 1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= 1) {
      setCount(value)
    }
  }

  const handleSubmit = () => {
    onSubmit(count)
  }

  return (
    <div>
      <div>
        <span>참가할 인원</span>
        <button onClick={handleDecrease}>-</button>
        <input 
          type="number" 
          value={count} 
          onChange={handleInputChange}
          min="1"
        />
        <button onClick={handleIncrease}>+</button>
      </div>
      <button onClick={handleSubmit}>
        참가 신청하기
      </button>
    </div>
  )
}

export default MeetingActionJoin;