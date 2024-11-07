import { LoginFormInputs } from '../types/user';
import { requestHeader } from './requestHeader';

// 로그인
export const postUserLogin = async (data: LoginFormInputs) => {
  const response = await requestHeader.post('/api/manager', data, {
    withCredentials: true,
  });
  return response.data;
};
