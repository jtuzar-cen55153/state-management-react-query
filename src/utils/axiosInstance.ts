import axios from 'axios';

export const getAxiosInstance = (token: string | null) => {
  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use(config => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  return instance;
};
