import { UseFormRegisterReturn } from 'react-hook-form';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { ComponentProps } from 'react';
import { getErrorMessage } from '../../utils/errorMessage';

interface Props {
  label: string;
  register: UseFormRegisterReturn;
  type: ComponentProps<typeof Input>['type'];
  error?: string;
}

function FloatingInput({ type, label, register, error }: Props): JSX.Element {
  const { ref, ...rest } = register;
  return (
    <FormGroup floating>
      <Input
        invalid={!!error}
        placeholder={label}
        type={type ?? 'text'}
        innerRef={ref}
        {...rest}
      />
      <Label>{label}</Label>
      {error && <FormFeedback>{getErrorMessage(error)}</FormFeedback>}
    </FormGroup>
  );
}

export default FloatingInput;
