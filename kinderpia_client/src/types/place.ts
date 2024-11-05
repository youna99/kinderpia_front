export interface PlaceData {
  placeId: string;
  placeName: string;
  placeCategoryName: string;
  location: string;
  detailAddress: string;
  latitude?: number;
  longitude?: number;
  paid: boolean;
  operatingDate: string;
  homepageUrl: string;
  placeNum: string;
  averageStar?: number;
}

export interface defaultPostReq {
  sort?: string;
  page?: number;
  size?: number;
  category?: string;
  keyword: string;
}

export interface ReviewData {
  id: number;
  writer: string;
  writerIcon: string;
  content: string;
  star: number;
  createdAt: string;
}

export interface ratingAndCategory {
  averageStar: number;
  placeCtgName: string;
}
