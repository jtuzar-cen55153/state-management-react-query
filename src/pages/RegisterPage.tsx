import { FC } from 'react';
import { useCreateUserMutation } from '../hooks/useUser';
import { useUserFormSubmit } from '../hooks/useUserFormSubmit';
import { UserForm } from '../components/UserForm';

export const RegisterPage: FC = () => {
  const { mutateAsync } = useCreateUserMutation();
  const { register, errors, handleSubmit, onSubmit } = useUserFormSubmit(mutateAsync);

  return (
    <UserForm
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      title="Register"
      buttonText="Register"
    />
  );
};
