// 리뷰 작성/수정 시 사용하는 DTO
export interface ReviewFormDTO {
  reviewId?: number;
  placeId: number;
  userId: number;
  star: number;
  reviewContent: string;
}

// 개별 리뷰 아이템의 기본 정보
export interface Review {
  reviewId: number;
  star: number;
  reviewContent: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

// 리뷰 데이터 전체 구조
export interface ReviewData {
  review: Review;
  nickname: string;
  profileImg: string | null;
  likeCount: number;
  blacklist: boolean;
}

// API 응답 구조
export interface ReviewsResponse {
  data: {
    reviews: ReviewData[];
    averageStar: number;
  };
  status: number;
  message: string;
}
