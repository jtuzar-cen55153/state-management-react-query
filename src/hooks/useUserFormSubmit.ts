import { SubmitHandler, useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { IUserFormInputs } from '../interface/user';

export const useUserFormSubmit = (mutateAsync: UseMutateAsyncFunction<string, unknown, IUserFormInputs>) => {
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IUserFormInputs>({ criteriaMode: 'all' });

  const onSubmit: SubmitHandler<IUserFormInputs> = async ({ email, password }) => {
    try {
      const token = await mutateAsync({ email, password });
      setToken(token);
      navigate('/', { replace: true });
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setError('root.serverError', {
          type: error.code,
          message: error.response?.data || error.message,
        });
      }
    }
  };

  return { handleSubmit, onSubmit, register, errors };
};
