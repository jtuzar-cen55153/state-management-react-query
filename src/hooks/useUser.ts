import { useMutation } from '@tanstack/react-query';
import { createUser, loginUser } from '../api/user';
import { useAxios } from './useAxios';

export const useCreateUser = () => {
  const axios = useAxios();

  return useMutation(createUser(axios));
};

export const useLoginUser = () => {
  const axios = useAxios();

  return useMutation(loginUser(axios));
};
