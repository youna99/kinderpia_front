import { requestHeader } from './requestHeader';

export const getMeetingListOpen = async (params: {
  sort?: string;
  page?: number;
  size?: number;
  category?: string;
  keyword?: string;
}) => {
  const response = await requestHeader.get('/api/meeting/list/open', {
    params,
    withCredentials: true,
  });
  return response.data;
};

export const getMeetingList = async (params: {
  sort?: string;
  page?: number;
  size?: number;
  category?: string;
  keyword?: string;
}) => {
  const response = await requestHeader.get('/api/meeting/list', {
    params,
    withCredentials: true,
  });
  return response.data;
};
