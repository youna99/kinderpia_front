export interface StatisticsResponse {
  labels: string[];
  data: number[];
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PaginationParams {
  page: number;
  size: number;
  direction: 'ASC' | 'DESC';
  property: string;
}

export interface ReportItem {
  id: number;
  reporterId: number;
  targetId: number;
  reason: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginationResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}