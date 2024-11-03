interface ChatRoomInfos {
    chatroomId : number;
    meetingId : number;
    meetingTitle : string;
    lastMessage : string;
}

export interface ChatRoomListInfo extends ChatRoomInfos {
    meetingCategory : string;
    totalCapacity : number;
    isActive : boolean;
}

export interface ChatRoomMemberInfo {
    userId : number;
    nickname : string;
    profileImg : string;
}

export interface ChatRoomInfo {
    chatroomId : number;
    meetingId : number;
    meetingTitle : string;
    lastMessage : string;
    active : boolean;
    capacity : number;
    lastMessageCreatedAt : Date;
    meetingCategoryName : string;
    users : ChatRoomMemberInfo[];
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