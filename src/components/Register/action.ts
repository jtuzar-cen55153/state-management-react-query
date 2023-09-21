import { ActionFunction, redirectDocument } from 'react-router-dom';
import { IRegisterFormInputs, IUserFormInputs } from '../../interface/user';

export const action =
  (login: ({ email, password }: IRegisterFormInputs) => Promise<void>): ActionFunction =>
  async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('password');
    const errors = {} as IUserFormInputs;

    if (typeof email !== 'string' || !email.includes('@')) {
      errors.email = "That doesn't look like an email address";
    }

    if (typeof password !== 'string' || password.length < 2) {
      errors.password = 'Password must be > 2 characters';
    }

    if (Object.keys(errors).length) {
      return errors;
    }

    await login({ email, password });

    return redirectDocument('/');
  };
