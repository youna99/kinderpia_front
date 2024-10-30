export interface CreateMeetingFormData {
  title: string;
  category: string;
  participants: number;
  hasParticipantsLimit: boolean;
  location: string;
  selectedDate: string;
  selectedTime: string;
  description: string;
  JoinMethod: boolean;
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
  title: string;
  participants: number;
  hasParticipantsLimit: boolean;
  description: string;
}
