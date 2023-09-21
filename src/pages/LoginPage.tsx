import { FC } from 'react';
import { useLoginPage } from '../components/Login/hooks/useLoginPage';
import { UserForm } from '../components/UserForm';

export const LoginPage: FC = () => {
  const { register, errors, handleSubmit, onSubmit } = useLoginPage();

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
