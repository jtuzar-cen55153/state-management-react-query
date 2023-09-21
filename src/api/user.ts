import { AxiosInstance } from 'axios';
import { URL_BASE } from '../constants/api';

export const createUser = (axios: AxiosInstance) => async (userPayload: any) => {
  const response = await axios.post(URL_BASE + 'register', userPayload);
  const token = response.data.accessToken;

  return token;
};

export const loginUser = (axios: AxiosInstance) => async (userPayload: { email: string; password: string }) => {
  const response = await axios.post<{ accessToken: string }>(URL_BASE + 'login', userPayload);
  const token = response.data.accessToken;

  return token;
};
