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

// export interface MeetingData{
//   id : number;
//   title: string;
//   category: string;
//   participants: number;
//   maxParticipants : number;
//   writer : string;
//   location: string;
//   latitute :number;
//   longitute :number;
//   selectedDate: string;
//   selectedTime: string;
//   description: string;
//   JoinMethod : boolean;
//   meetingStatus : string;
// }

export interface CategoryResponse {
  categories: string[];
}

export interface UpdateMeetingFormData {
  title: string;
  participants: number;
  hasParticipantsLimit: boolean;
  description: string;
}
