import { requsetHeader } from './requestHeader';

export const getMeeting = async (params: {
  sort: string;
  page: number;
  limit: number;
  category?: string;
  keyword?: string;
}) => {
  const response = await requsetHeader.get('/api/meeting', { params });
  return response.data;
};
