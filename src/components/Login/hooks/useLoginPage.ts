import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLoginUser } from '../../../hooks/useUser';
import { useAuth } from '../../../hooks/useAuth';
import { IUserFormInputs } from '../../../interface/user';

export const useLoginPage = () => {
  const { mutateAsync } = useLoginUser();
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
      if (axios.isAxiosError(error)) {
        setError('root.serverError', {
          type: error.code,
          message: error.response?.data || error.message,
        });
      }
    }
  };

  return { handleSubmit, onSubmit, register, errors };
};
