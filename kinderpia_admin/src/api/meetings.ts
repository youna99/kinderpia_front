import { requestHeader } from './requestHeader';

export const fetchMeetingByCategory = async () => {
  try{
    const response = await requestHeader.get('/api/manager/meetingCnt/category');
    console.log('>>>>>', response.data.data );
    
    return response.data.data;
  } catch (error) {
    console.error('데이터 조회 실패:', error);
    return 0;
  }
}
export const fetchDailyMeetingUser = async () => {
  try{
    const response = await requestHeader.get('/api/manager/acceptedUserCnt/daily');
    console.log('>>>>>', response.data.data );
    
    return response.data.data;
  } catch (error) {
    console.error('데이터 조회 실패:', error);
    return 0;
  }
}