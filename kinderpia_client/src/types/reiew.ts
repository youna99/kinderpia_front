
// types/review.ts
export interface ReviewFormDTO {
  reviewId?: number;  // 수정 시에만 필요
  placeId: number;
  userId: number;
  star: number;
  reviewContent: string;
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