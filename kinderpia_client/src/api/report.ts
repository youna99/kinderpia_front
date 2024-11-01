import { requestHeader } from "./requestHeader";

// 채팅 메시지 조회(목록)
export const postReport = (id:number) => {
    requestHeader.post(`/api/report`, id,{withCredentials:true})
};

// 신고하기!
export const postReports = async ( id:number, reportReasonId: string, reportMessageContent: string) => {
    
    const result = await requestHeader.post(`/api/report`, {id, reportReasonId, reportMessageContent}, {withCredentials:true});

    return result;
};

