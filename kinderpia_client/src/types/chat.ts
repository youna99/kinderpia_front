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