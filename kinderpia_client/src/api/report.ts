import { requestHeader } from "./requestHeader";

// 채팅 메시지 조회(목록)
export const postReport = (id:number) => {
    requestHeader.post(`/api/report`, id)
};