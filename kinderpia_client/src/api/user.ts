import { LoginFormInputs } from '../types/user';
import { requestHeader } from './requestHeader';

export const postUserLogin = async (data: LoginFormInputs) => {
  const response = await requestHeader.post('/api/user/login', data, {
    withCredentials: true,
  });
  return response.data;
};

export const postRegister = async (field: string, value: string) => {
  const response = await requestHeader.post(`/api/user/check/${field}`, {
    [field]: value,
  });
  return response;
};
