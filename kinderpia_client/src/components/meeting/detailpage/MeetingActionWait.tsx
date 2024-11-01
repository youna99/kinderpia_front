import React from 'react'
import CommonButton1 from '../../common/CommonButton1'

import '../../../styles/meeting/detailpage/MeetingActionWait.scss';

const MeetingActionWait = () => {

  const pleaseWait = async (): Promise<void> => {
    alert('모임 가입이 승인될 때 까지 기다려주세요');
  }
  
  return (
    <div className='meeting-action-wait-container'>
      <CommonButton1 
        text='수락 대기중'
        onClick={pleaseWait}
        disabled={true}
        isLoading={false}
      />
    </div>
  )
}

export default MeetingActionWait