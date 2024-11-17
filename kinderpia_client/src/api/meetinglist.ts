import { requestHeader } from './requestHeader';

export const getMeetingListOpen = async (params: {
  sort?: string;
  page?: number;
  size?: number;
  category?: string;
  keyword?: string;
}) => {
  try{
    const response = await requestHeader.get('/api/meeting/list/open', {
      params,
      withCredentials: true,
    });
    return response.data;
  }catch(err){
    return;
  }
};

export const getMeetingList = async (params: {
  sort?: string;
  page?: number;
  size?: number;
  category?: string;
  keyword?: string;
}) => {
  try{
    const response = await requestHeader.get('/api/meeting/list', {
      params,
      withCredentials: true,
    });
    return response.data;
  }catch (error) {
    // console.log(error);
    return;
  }
};

export const getMeetingListNotDeleted = async (params: {
  sort?: string;
  page?: number;
  size?: number;
  category?: string;
  keyword?: string;
}) => {
  try{
    const response = await requestHeader.get('/api/meeting/list/notDeleted', {
      params,
      withCredentials: true,
    });
    return response.data;
  }catch (error) {
    // console.log(error);
    return;
  }
};

// api/meeting.ts
export const getMeetingListSearch = async (params: {
  keyword?: string;
  page?: number;
  size?: number;
}) => {
  try {
    const response = await requestHeader.get('/api/meeting/list/search', {
      params,
    });
    return response.data;
  } catch (error) {
    // console.log(error);
    return;
  }
};

export const fakeSignInLogIn = async (randomNumber: number) => {
  function generateFourDigitNumber() {
    return Math.floor(Math.random() * 9000) + 1000;
  }
  const data = {
    agreePrivacy: true,
    agreeTerms: true,
    email: `${generateFourDigitNumber()}@${generateFourDigitNumber()}.${generateFourDigitNumber()}`,
    loginId: 'test' + `${randomNumber}`,
    nickname: `테스트유저${randomNumber}`,
    phoneNum: `82${generateFourDigitNumber()}${generateFourDigitNumber()}`,
    pwCheck: 'test1234',
    userPw: 'test1234',
  };
  const data2 = {
    loginId: `test${randomNumber}`,
    userPw: `test1234`,
  };
  try {
    const fakeUp = await requestHeader.post(
      `/api/user/register`,
      data
    );
    if (fakeUp) {
      const fakeIn = await requestHeader.post(
        `/api/user/login`,
        data2
      );
    }
    return true;
  } catch (error) {
    return false;
  }
};
