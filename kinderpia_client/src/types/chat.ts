export interface ChatRoomListInfo {
  chatroomId: number;
  meetingId: number;
  meetingTitle: string;
  meetingHeader: number;
  lastMessage: string;
  active: boolean;
  meetingCategoryName: string;
  capacity: number;
}

export interface ChatRoomMemberInfo {
  userId: number;
  nickname: string;
  profileImg: string;
}

export interface ChatRoomInfo extends ChatRoomListInfo {
  lastMessageCreatedAt: Date;
  users: ChatRoomMemberInfo[];
}

export interface ChatMessageInfo {
  chatmsgId?: number;
  chatroomId: number;
  senderId?: number;
  senderNickname?: string;
  senderProfileImg?: string;
  chatmsgContent: string;
  createdAt: string;
  messageType?: string;
}

export interface ChatPageInfo {
  page: number;
  totalElements: number;
  totalPages: number;
}
