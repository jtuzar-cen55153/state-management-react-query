export interface IUserFormInputs {
  email: string;
  password: string;
}

export interface IRegisterFormInputs {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}
