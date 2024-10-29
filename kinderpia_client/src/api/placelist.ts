import { requestHeader } from './requestHeader';

export const getPlace = async (params: {
  sort: string;
  page: number;
  limit: number;
  category?: string;
  keyword?: string;
}) => {
  const response = await requestHeader.get('/api/place', { params });
  return response.data;
};
