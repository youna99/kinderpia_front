// meetingApi.ts
import { CreateMeetingFormData, CategoryResponse } from '../types/meeting';
import { requestHeader } from './requestHeader';

const BASE_URL = '/meetings';

export const createMeeting = async (
  data: CreateMeetingFormData
): Promise<CreateMeetingFormData> => {
  const response = await requestHeader.post<CreateMeetingFormData>(
    BASE_URL,
    data,
    { withCredentials: true }
  );
  return response.data;
};

export const getCategory = async (): Promise<String[]> => {
  const response = await requestHeader.get<CategoryResponse>(
    `${BASE_URL}/category`,
    { withCredentials: true }
  );
  return response.data.categories;
};

// 모든 API 함수들을 하나의 객체로 내보내기
export const meetingApi = {
  createMeeting,
  getCategory,
};