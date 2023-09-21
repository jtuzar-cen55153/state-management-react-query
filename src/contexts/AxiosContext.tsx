import { AxiosInstance } from 'axios';
import { FC, ReactNode, createContext, useMemo } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getAxiosInstance } from '../utils/axiosInstance';

export const AxiosContext = createContext<AxiosInstance>({} as AxiosInstance);

const AxiosProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { token } = useAuth();

  const axiosInstance = useMemo(() => getAxiosInstance(token), [token]);

  return <AxiosContext.Provider value={axiosInstance}>{children}</AxiosContext.Provider>;
};

export default AxiosProvider;
