import { FC } from 'react';
import { UserForm } from '../components/UserForm';
import { useUserFormSubmit } from '../hooks/useUserFormSubmit';
import { useLoginUserMutation } from '../hooks/useUser';

export const LoginPage: FC = () => {
  const { mutateAsync } = useLoginUserMutation();
  const { register, errors, handleSubmit, onSubmit } = useUserFormSubmit(mutateAsync);

  return (
    <UserForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      title="Log in"
      buttonText="Log In"
    />
  );
};
