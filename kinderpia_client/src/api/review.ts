import { requestHeader } from "./requestHeader";
import { ReviewFormDTO, ReviewResponse } from "../types/reiew";

export const getReviewList = async (placeId: number): Promise<ReviewResponse> => {
  const response = await requestHeader.get<ReviewResponse>(
    `/api/review/${placeId}`
  );
  return response.data;
};

export const postReview = async (data: ReviewFormDTO) => {
  const response = await requestHeader.post(
    `/api/review`,
    data
  );
  return response.data;
};

export const updateReview = async (reviewId: number, data: ReviewFormDTO) => {
  const response = await requestHeader.put(
    `/api/review/update/${reviewId}`,
    data
  );
  return response.data;
};

export const deleteReview = async (reviewId: number, data: ReviewFormDTO) => {
  const response = await requestHeader.delete(
    `/api/review/delete/${reviewId}`,
    { data }
  );
  return response.data;
};