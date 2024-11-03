export interface PlaceData {
  placeId: number;
  placeName: string;
  placeCategoryName: string;
  location: string;
  detailAddress: string;
  latitude?: number;
  longitude?: number;
  // placeImg: string;
  paid: boolean;
  operatingDate: string;
  homepageUrl: string;
  placeNum: string;
  rating?: number;
}

export interface defaultPostReq{
  sort?: string;
  page?: number;
  size?: number;
  category?: string,
  keyword: string,
}

export interface ReviewData {
  id: number;
  writer: string;
  writerIcon: string;
  content: string;
  star: number;
  createdAt: string;
}
