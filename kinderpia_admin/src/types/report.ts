export interface ReportData {
  reportId: number;
  createdAt: string;
  reportmsgContent: string;
  chatmsgId: number | null;
  meetingId: number | null;
  reportRsId: number;    
  reportedId: number;    
  reporterId: number;    
  reviewId: number | null;
}

export interface ReportReason {
  reportRsId: number;
  reportRsName: string;
}

export interface PaginationResponse {
  content: ReportData[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}