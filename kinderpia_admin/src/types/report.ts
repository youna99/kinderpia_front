export interface ReportData {
  reportId: number;
  createdAt: string;
  reportMessageContent: string;
  chatMessageId: number | null;
  meetingId: number | null;
  reportReasonId: number;    
  reportedId: number;    
  reporterId: number;    
  reviewId: number | null;
}

export interface ReportReason {
  reportReasonId: number;
  reportReasonName: string;
}

export interface PaginationResponse {
  content: ReportData[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}