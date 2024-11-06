import { RepostData } from "../types/report";
import { getJwtFromCookies } from "../utils/extractUserIdFromCookie";
import { requestHeader } from "./requestHeader";

// 채팅 메시지 조회(목록)
export const postReports = (id:number , data : any, msgContent: any) => {
    const result = requestHeader.post(`/api/report`, id,{withCredentials:true})

    return result;
};

// 신고하기! 
export const postReportBadContent = async (data :RepostData) => {
    const token = getJwtFromCookies();
    const result = await requestHeader.post(`/api/report`, data, {    
        //     headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
      withCredentials:true
    });
    return result;
};

