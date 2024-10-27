import { CreateMeetingFormData, CategoryResponse } from '../types/meeting';
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
    const reqUrl = this.BASE_URL; 
    const response = await requsetHeader.post<CreateMeetingFormData>(
      reqUrl,
      data,
      { withCredentials : true }
    );
    return response.data;
  }

  public async getCategory(): Promise<String[]> { //API 실제 작성에 따라서 변경 필요
      const response = await requsetHeader.get<CategoryResponse>(
        `${this.BASE_URL}/category`,
        { withCredentials: true }
      );
      return response.data.categories;
  }
}

export const meetingApi = MeetingApi.getInstance();