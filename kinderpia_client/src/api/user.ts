import { LoginFormInputs, RegisterFormInputs } from '../types/user';
import { requestHeader } from './requestHeader';

export const postUserLogin = async (data: LoginFormInputs) => {
  const response = await requestHeader.post('/api/user/login', data, {
    withCredentials: true,
  });
  return response.data;
};

export const postRegister = async (field: RegisterFormInputs) => {
  const response = await requestHeader.post(
    `http://localhost:8080/api/user/check/${field}`
  );
};
