import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createUser, loginUser } from '../api/user';
import { useAxios } from './useAxios';
import { useAuth } from './useAuth';

export const useCreateUserMutation = () => {
  const axios = useAxios();

  return useMutation(createUser(axios));
};

export const useLoginUserMutation = () => {
  const axios = useAxios();

  return useMutation(loginUser(axios));
};

export const useLogoutUser = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    navigate('/login');
  };

  return logout;
};
