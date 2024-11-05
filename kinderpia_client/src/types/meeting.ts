export interface CreateMeetingFormData {
  userId: number;
  meetingCategoryId: number;
  meetingTitle :string;
  totalCapacity: number;
  district:string;
  limited: boolean;
  meetingLocation: string;
  meetingTime: string;
  meetingContent: string;
  authType: boolean;
  detailAddress: string;

  // private LocalDateTime meetingTime;  // 모임 일시
  // private MeetingStatus meetingStatus = MeetingStatus.ONGOING;  // 모임 상태 (기본값 "ONGOING")
}

export interface MeetingDetailData {
  meetingId: number;
  userId: number;
  nickname: string;
  meetingCategory: string;
  meetingTitle: string;
  capacity: number;
  totalCapacity: number;
  meetingContent: string;
  meetingLocation: string;
  detailAddress: string;
  meetingTime: string;    // ISO 8601 형식의 날짜 문자열
  meetingStatus: 'ONGOING' | 'COMPLETED' | 'CANCELLED';  // 가능한 상태값들을 명시적으로 정의
  createdAt: string;      // ISO 8601 형식의 날짜 문자열
  authType: boolean;
 }
export interface MeetingData{
  meetingId : number;
  meetingTitle: string;
  meetingCategory: string;
  participants: number;
  totalCapacity : number;
  nickname : string;
  meetingLocation: string;
  detailAddress: string;
  meetingTime: string;
  meetingContent: string;
  authType : boolean;
  meetingStatus : string;
  createdAt :string;
}

export interface MeetingUserData{
  userId: number,
  joined : boolean,  
  accepted : boolean,
  reported: boolean,
}
export interface MeetingUserResponse{
  data: any,
  status: number,
  message :string,
}
export interface MeetingUserStatusData{
  userId : number;
  meetingId : number;
}

export interface CategoryResponse {
  categories: string[];
}

export interface UpdateMeetingFormData {
  meetingTitle: string;
  totalCapacity: number;
  hasParticipantsLimit: boolean;
  description: string;
}

export interface MeetingJoinData{
  userId : number;
  meetingId : number;
  capacity : number;
}