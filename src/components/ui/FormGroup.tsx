/* eslint-disable react/require-default-props */
import { forwardRef } from 'react';
import { Input, Label, FormGroup as FormGroupReactstrap, FormFeedback } from 'reactstrap';

interface FormGroupProps {
  label: string;
  name: string;
  placeholder?: string;
  inputType?: 'text' | 'password' | 'email' | 'textarea';
  errorMessage?: string;
  isInvalid?: boolean;
  isValid?: boolean;
  required?: boolean;
}

export const FormGroup = forwardRef<HTMLInputElement, FormGroupProps>(
  (
    { label, name, placeholder = '', inputType = 'text', errorMessage, isInvalid = false, isValid = false, ...rest },
    ref,
  ) => (
    <FormGroupReactstrap>
      <Label for={name}>{label}</Label>
      <Input
        innerRef={ref}
        name={name}
        placeholder={placeholder}
        type={inputType}
        invalid={isInvalid}
        valid={isValid}
        {...rest}
      />
      {isInvalid && errorMessage && <FormFeedback data-testid="form-group-feedback">{errorMessage}</FormFeedback>}
    </FormGroupReactstrap>
  ),
);

FormGroup.displayName = 'FormGroup';
