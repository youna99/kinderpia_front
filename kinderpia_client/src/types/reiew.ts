
export interface PostReviewForm{
  userId : number;
  placeId : number;
  star : number;
  content : string;
}

// types/review.ts
export interface ReviewItem {
  reviewId: number;
  star: number;
  reviewContent: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

export interface ReviewData {
  review: ReviewItem;
  nickname: string;
  profileImg: string;
  likeCount: number;
  blacklist: boolean;
}

export interface ReviewResponseData {
  reviews: ReviewData[];
  averageStar: number;
}

export interface ReviewResponse {
  data: ReviewResponseData;
  status: number;
  message: string;
}