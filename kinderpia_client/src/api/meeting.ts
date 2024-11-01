// meetingApi.ts
import {
  CreateMeetingFormData,
  CategoryResponse,
  UpdateMeetingFormData,
} from '../types/meeting';
import { requestHeader } from './requestHeader';

export const createMeeting = async (
  data: CreateMeetingFormData
): Promise<CreateMeetingFormData> => {
  const response = await requestHeader.post<CreateMeetingFormData>(
    '/meetings',
    data,
    { withCredentials: true }
  );
  return response.data;
};

export const getCategory = async (): Promise<String[]> => {
  const response = await requestHeader.get<CategoryResponse>(
    `/meetings/category`,
    { withCredentials: true }
  );
  return response.data.categories;
};

export const updateMeeting = async (
  meetingid: number,
  data: UpdateMeetingFormData
) => {
  const response = await requestHeader.put(`/api/meeting/${meetingid}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const meetingApi = {
  createMeeting,
  getCategory,
};
