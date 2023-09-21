import axios from 'axios';
import { useAuth } from './useAuth';
import { useCreateUser } from './useUser';
import { IRegisterFormInputs } from '../interface/user';

export const useRegister = () => {
  const { setToken } = useAuth();
  const { mutateAsync } = useCreateUser();

  const register = async ({ email, password }: IRegisterFormInputs) => {
    try {
      const token = await mutateAsync({ email, password });
      setToken(token);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error);
      }
      console.error(error);
    }
  };

  return { register };
};
