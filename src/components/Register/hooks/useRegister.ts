import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth';
import { useCreateUserMutation } from '../../../hooks/useUser';
import { IRegisterFormInputs } from '../../../interface/user';

export const useRegister = () => {
  const { setToken } = useAuth();
  const { mutateAsync } = useCreateUserMutation();

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
