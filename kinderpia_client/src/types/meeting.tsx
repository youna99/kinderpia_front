export interface CreateMeetingFormData {
  title: string;
  category: string;
  participants: number;
  hasParticipantsLimit: boolean;  // 추가된 필드
  location: string;
  latitute :number;
  longitute :number;
  selectedDate: string;
  selectedTime: string;
  description: string;
  JoinMethod : boolean;
}
export interface CategoryResponse {
  categories: string[];
}