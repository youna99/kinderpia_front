import { requestHeader } from './requestHeader';

export const getMeeting = async (params: {
  sort?: string;
  page?: number;
  size?: number;
  category?: string;
  keyword?: string;
}) => {
  const response = await requestHeader.get('/api/meeting/list/open', {
    params,
  });
  return response.data;
};
