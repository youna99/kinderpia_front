export interface RepostData {
  reportId? : number;
  chatMessageId? : number;
  reviewId? : number;
  placeId? : number;
  meetingId? :number;
  reporterId? :number;
  reportedId? : number;
  reportReasonId?: number;
  reportReasonName? : string;
  reportMessageContent? : string;
  createdAt? : string;

  // private Long reportId;
  // private Long chatMessageId;
  // private Long reviewId;
  // private Long meetingId;
  // private Long reporterId;
  // private Long reportedId;
  // private Long reportReasonId;
  // private String reportReasonName;
  // private String reportMessageContent;
  // private LocalDateTime createdAt;
}
