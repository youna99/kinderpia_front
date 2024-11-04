export interface CreateMeetingFormData {
  userId: number;
  meetingCategoryId: number;
  meetingTitle :string;
  totalCapacity: number;
  isLimited: boolean;
  meetingLocation: string;
  district: string;
  meetingTime: string;
  meetingContent: string;
  isAuthType: boolean;

  // private LocalDateTime meetingTime;  // 모임 일시
  // private MeetingStatus meetingStatus = MeetingStatus.ONGOING;  // 모임 상태 (기본값 "ONGOING")
}

export interface MeetingData{
  meetingId : number;
  title: string;
  category: string;
  participants: number;
  maxParticipants : number;
  writer : string;
  location: string;
  selectedDate: string;
  selectedTime: string;
  description: string;
  JoinMethod : boolean;
  meetingStatus : string;
  createdAt :string;
}

export interface MeetingUserData{
  userId: number,
  isJoined : boolean,  
  ispermitted : boolean,
  isReport: boolean,
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