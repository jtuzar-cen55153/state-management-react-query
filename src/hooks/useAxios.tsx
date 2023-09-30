import { useContext } from 'react';
import { AxiosContext } from '../contexts/AxiosContext';

export const useAxios = () => {
  const context = useContext(AxiosContext);

  if (context) {
    return context;
  }

  throw new Error('useAxios must be used within a AxiosProvider');
};
