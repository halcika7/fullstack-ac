import { UseFormRegisterReturn } from 'react-hook-form';
import { FormGroup, Input, Label } from 'reactstrap';
import { ComponentProps } from 'react';

interface Props {
  label: string;
  register: UseFormRegisterReturn;
  type: ComponentProps<typeof Input>['type'];
}

function FloatingInput({ type, label, register }: Props) {
  return (
    <FormGroup floating>
      <Input placeholder={label} type={type ?? 'text'} {...register} />
      <Label>{label}</Label>
    </FormGroup>
  );
}

export default FloatingInput;
