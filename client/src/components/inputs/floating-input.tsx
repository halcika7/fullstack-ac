import { ComponentProps } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { getErrorMessage } from '../../utils/errorMessage';

interface Props {
  label: string;
  register: UseFormRegisterReturn;
  type: ComponentProps<typeof Input>['type'];
  error?: string;
  testId?: string;
}

function FloatingInput({
  type,
  label,
  register,
  error,
  testId,
}: Props): JSX.Element {
  const { ref, ...rest } = register;
  return (
    <FormGroup floating>
      <Input
        invalid={!!error}
        placeholder={label}
        type={type}
        innerRef={ref}
        data-testid={testId}
        {...rest}
      />
      <Label>{label}</Label>
      {error && <FormFeedback>{getErrorMessage(error)}</FormFeedback>}
    </FormGroup>
  );
}

export default FloatingInput;
