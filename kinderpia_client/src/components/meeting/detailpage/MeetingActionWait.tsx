import React from 'react'
import CommonButton1 from '../../common/CommonButton1'

import '../../../styles/meeting/detailpage/MeetingActionWait.scss';
import { simpleAlert } from '../../../utils/alert';

const MeetingActionWait = () => {

  const pleaseWait = async (): Promise<void> => {
    simpleAlert('info','모임 가입이 승인될 때 까지 기다려주세요','center');
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