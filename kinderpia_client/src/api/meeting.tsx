import { CreateMeetingFormData } from '../types/meeting';
import { requsetHeader } from './requestHeader';

class MeetingApi {
  private static instance: MeetingApi;
  private readonly BASE_URL = '/meetings';

  private constructor() {}

  public static getInstance(): MeetingApi {
    if (!MeetingApi.instance) {
      MeetingApi.instance = new MeetingApi();
    }
    return MeetingApi.instance;
  }

  public async createMeeting(data: CreateMeetingFormData): Promise<CreateMeetingFormData> {
    const response = await requsetHeader.post<CreateMeetingFormData>(this.BASE_URL, data);
    return response.data;
  }
}

export const meetingApi = MeetingApi.getInstance();