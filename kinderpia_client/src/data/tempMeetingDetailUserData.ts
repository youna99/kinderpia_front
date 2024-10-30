import { MeetingUserData } from "../types/meeting";

// 참가 신청은 했지만 허가되지 않은 경우 , 신고 x
export const dummyMeetingUser1: MeetingUserData = 
  { 
    userId: 1,
    isJoined : true,
    ispermitted : false,
    isReport: false,
  }
  
// 참가 신청을 하고 허가 받은 경우, 신고 x
export const dummyMeetingUser2: MeetingUserData = 
  { 
    userId: 1,
    isJoined : true,  
    ispermitted : true,
    isReport: false,
  }

// 참가 신청하지 않은 경우, 신고 o
export const dummyMeetingUser3: MeetingUserData = 
  { 
    userId: 1,
    isJoined : false,  
    ispermitted : false,
    isReport: true,
  }

