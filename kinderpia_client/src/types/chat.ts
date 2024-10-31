export interface ChatRoomListInfo {
    chatroomId : number;
    meetingId : number;
    meetingTitle : string;
    meetingCategory : string;
    lastMessage : string;
    totalCapacity : number;
    isActive : boolean;
}

export interface ChatRoomMemberInfo {
    memberId : number;
    username : string;
    profileImg : string;
}

export interface ChatRoomInfo extends ChatRoomListInfo {
    member : ChatRoomMemberInfo[];
}

export interface ChatMessageInfo {
    chatmsgId: number;
    chatroomId: number;
    senderId: number;
    senderNickname: string;
    senderProfileImg: string;
    chatmsgContent: string;
    createdAt: string; // LocalDateTime 형식의 문자열
    messageType: string; // MessageType의 문자열 표현
}