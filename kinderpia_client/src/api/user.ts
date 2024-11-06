import { LoginFormInputs } from '../types/user';
import { requestHeader } from './requestHeader';

export const postUserLogin = async (data: LoginFormInputs) => {
  const response = await requestHeader.post('/api/user/login');
  return response.data;
};
