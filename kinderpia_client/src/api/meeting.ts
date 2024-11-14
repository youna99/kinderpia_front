import {
  CreateMeetingFormData,
  CategoryResponse,
  UpdateMeetingFormData,
  MeetingJoinData,
  MeetingUserStatusData,
} from '../types/meeting';
import { requestHeader } from './requestHeader';

export const getMeeting = async ( 
  meetingId: number
)=> {
  try{
    const response = await requestHeader.get(
      `/api/meeting/${meetingId}`
    );
    return response.data.data;  
  }catch(err){
    console.log(err);
    return ;
  }
};

export const getMeetingUser = async( 
  data : MeetingUserStatusData
)=>{
  try{
    const response = await requestHeader.post(
      `/api/user/meeting/status`,
      data
    );

    return response.data;  
  }catch(err){
    console.log(err);
    return;
  }
}

export const postMeeting = async (
  data: CreateMeetingFormData
) => {
    try{  const response = await requestHeader.post(
      '/api/meeting',
      data,
      { withCredentials: true }
    );
    return response.data;
  }catch(err){
    console.error(err);
    return;
  }
};


export const getCategory = async (): Promise<String[]> => {
  const response = await requestHeader.get<CategoryResponse>(
    `/api/meetings/category`,
    { withCredentials: true }
  );
  return response.data.categories;
};

/**
 * 
 * @param meetingid  : number
 * @param data : UpdataMeetingFormData 
 * @returns 
 */
export const putMeeting = async (
  meetingid: number,
  data: UpdateMeetingFormData
) => {
  try {
    const response = await requestHeader.put(`/api/meeting/${meetingid}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

// 모임 떠나기
export const deleteLeaveMeeting = async (meetingId : number) => {
  try{
    const response = await requestHeader.delete(`/api/userMeeting/exit/${meetingId}`);
    return response;
  }catch(err){
    console.log(err);
  }
}

// 모임 가입하기
export const postJoinMeeting = async (
  data: MeetingJoinData,
  meetingId: number
) => {
  try {
    console.log(data, meetingId);
    
    const response = await requestHeader.post(`/api/userMeeting/join/${meetingId}`, data);
    return response.data;
    
  } catch (error: any) {
    if (error.response?.status === 409) {
      // 409 Conflict 에러 처리
      throw {
        status: 409,
        message: '이미 가입된 모임입니다.'
      };
    }
    // 다른 에러는 그대로 전달
    throw error;
  }
};

// 모임 삭제하기
export const putDeleteMeeting = async(
  meetingId : number
) => {
  const response = await requestHeader.put(`/api/meeting/${meetingId}/deleted`);

  return response.data;
}

// 모임 종료하기
export const putCompleteMeeting = async(
  meetingId : number
) => {
  const response = await requestHeader.put(`/api/meeting/${meetingId}/completed`);

  return response.data;
}

// 승인 대기자 목록 불러오기
export const getMeetingUserWaitList = async(
  meetingId:number, 
)=>{
  const response = await requestHeader.get(`/api/user/meeting/${meetingId}/pending-approvals`);

  return response.data;
}

export const putUserMeetingApprove = async (
  meetingId: number,
  joinUserId: number
) => {
  const response = await requestHeader.put(`/api/userMeeting/${meetingId}/accept/${joinUserId}`);
  return response;
};

export const deleteUserMeetingReject = async (
  meetingId: number,
  joinUserId: number
) => {
  const response = await requestHeader.delete(`/api/userMeeting/${meetingId}/reject/${joinUserId}`);
  return response.data;
};

export const getCheckMeetingStatus = async (
  meetingId: number,
) => {
  const response = await requestHeader.put(`/api/meeting/${meetingId}/meetingStatus`);
  return response.data;
};