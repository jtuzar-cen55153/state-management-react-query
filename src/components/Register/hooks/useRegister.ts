import { isAxiosError } from 'axios';
import { useAuth } from '../../../hooks/useAuth';
import { useCreateUserMutation } from '../../../hooks/useUser';
import { IRegisterFormInputs } from '../../../interface/user';

export const useRegister = () => {
  const { setToken } = useAuth();
  const { mutateAsync } = useCreateUserMutation();

  const register = async ({ email, password }: IRegisterFormInputs) => {
    try {
      const token = await mutateAsync({ email: email || '', password: password || '' });
      setToken(token);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return { register };
};
