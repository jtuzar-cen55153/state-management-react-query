import { FC } from 'react';
import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { Alert, Button, Form } from 'reactstrap';
import { IUserFormInputs } from '../interface/user';
import { FormGroup } from './ui/FormGroup';

interface UserFormProps {
  register: UseFormRegister<IUserFormInputs>;

  handleSubmit: UseFormHandleSubmit<IUserFormInputs>;
  onSubmit: SubmitHandler<IUserFormInputs>;
  errors: FieldErrors<IUserFormInputs>;
  title: string;
  buttonText: string;
}

export const UserForm: FC<UserFormProps> = ({ handleSubmit, onSubmit, errors, register, title, buttonText }) => {
  return (
    <div>
      <h1>{title}</h1>
      {errors.root?.serverError.type && <Alert color="danger">{errors.root.serverError.message}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)} method="post">
        <FormGroup
          label="Email"
          inputType="email"
          placeholder="test@test.com"
          isInvalid={Boolean(errors.root?.serverError) || Boolean(errors?.email)}
          errorMessage={Boolean(errors?.email) ? 'Email is required!' : ''}
          {...register('email', { required: true })}
        />
        <FormGroup
          label="Password"
          inputType="password"
          isInvalid={Boolean(errors.root?.serverError) || Boolean(errors?.password)}
          errorMessage={Boolean(errors?.password) ? 'Password is required!' : ''}
          {...register('password', { required: true })}
        />
        <Button>{buttonText}</Button>
      </Form>
    </div>
  );
};
