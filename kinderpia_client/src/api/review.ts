// api/review.ts
import { requestHeader } from "./requestHeader";
import { PostReviewForm, ReviewResponse } from "../types/reiew";

export const getReviewList = async (placeId: number): Promise<ReviewResponse> => {
  const response = await requestHeader.get<ReviewResponse>(
    `/api/review/${placeId}`,
    { 
      withCredentials: true 
    }
  );
  return response.data;
};

export const postReview = async (data: PostReviewForm): Promise<PostReviewForm> => {
  const response = await requestHeader.post<PostReviewForm>(
    `/api/review/${data.placeId}`,
    data,
    { 
      withCredentials: true 
    }
  );
  return response.data;
};