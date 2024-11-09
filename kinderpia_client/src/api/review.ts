import { requestHeader } from './requestHeader';
import { ReviewFormDTO } from '../types/review';

export const getReviewList = async (params: {
  placeId: number;
  page: number;
  size: number;
}) => {
  const response = await requestHeader.get(`/api/review`, { params });
  return response.data;
};

export const postReview = async (data: ReviewFormDTO) => {
  const response = await requestHeader.post(`/api/review`, data);
  return response.data;
};

export const updateReview = async (reviewId: number, data: ReviewFormDTO) => {
  const response = await requestHeader.put(
    `/api/review/update/${reviewId}`,
    data
  );
  return response.data;
};

export const deleteReview = async (reviewId: number) => {
  const response = await requestHeader.delete(`/api/review/delete/${reviewId}`);
  return response.data;
};

export const postLike = async (reviewId: number) => {
  const response = await requestHeader.post(`/api/review/likes/${reviewId}`);
  return response.data;
};
