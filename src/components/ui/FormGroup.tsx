import React, { FC, Ref, forwardRef } from 'react';
import { Input, Label, FormGroup as FormGroupReactstrap, FormFeedback } from 'reactstrap';

interface FormGroupProps {
  label: string;
  name: string;
  placeholder?: string;
  inputType?: 'text' | 'password' | 'email' | 'textarea';
  errorMessage?: string;
  isInvalid?: boolean;
}

export const FormGroup: FC<FormGroupProps> = forwardRef(
  (
    { label, name, placeholder = '', inputType = 'text', errorMessage, isInvalid = false, ...rest },
    ref: Ref<HTMLInputElement>,
  ) => (
    <FormGroupReactstrap>
      <Label for={name}>{label}</Label>
      <Input
        innerRef={ref}
        name={name}
        placeholder={placeholder}
        type={inputType}
        invalid={isInvalid}
        valid={!isInvalid}
        {...rest}
      />
      {isInvalid && errorMessage && <FormFeedback>{errorMessage}</FormFeedback>}
    </FormGroupReactstrap>
  ),
);
