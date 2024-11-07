import { requestHeader } from "./requestHeader";

export const getPlaces = async (params: {
  // sort: string;
  page: number;
  size: number;
  category?: string;
  keyword?: string;
}) => {
  const response = await requestHeader.get('/api/place', { params });
  return response.data;
};