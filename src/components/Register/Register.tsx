import { FC } from 'react';
import { Form, useActionData } from 'react-router-dom';
import { IUserFormInputs } from '../../interface/user';
import { Button, Form as FormReactstrap } from 'reactstrap';
import { FormGroup } from '../ui/FormGroup';

export const Register: FC = () => {
  const errors = useActionData() as IUserFormInputs;

  return (
    <div>
      <h1>Register</h1>
      <FormReactstrap method="post" tag={Form}>
        <FormGroup
          name="email"
          label="Email"
          inputType="email"
          placeholder="test@test.com"
          isInvalid={Boolean(errors?.email)}
          errorMessage={errors?.email}
        />
        <FormGroup
          name="password"
          label="Password"
          inputType="password"
          isInvalid={Boolean(errors?.password)}
          errorMessage={errors?.password}
        />
        <Button>Register</Button>
      </FormReactstrap>
    </div>
  );
};
