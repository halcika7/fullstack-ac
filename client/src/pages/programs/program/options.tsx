import { FieldError, UseFormRegister } from 'react-hook-form';
import { Button, Col, Row } from 'reactstrap';
import FloatingInput from '../../../components/inputs/floating-input';
import { Option, ProgramDto } from '../store/types';

type Props = {
  register: UseFormRegister<ProgramDto>;
  index: number;
  errors?: Partial<Record<keyof Option, FieldError | undefined>>[];
  removeOption: (i: number) => () => void;
};

function ProgramOption({ register, index, errors, removeOption }: Props) {
  return (
    <Row style={{ marginBottom: '2rem' }}>
      <Col sm={{ size: 12 }} md={{ size: 4 }} lg={{ size: 3 }} xl={{ size: 2 }}>
        <FloatingInput
          register={register(`options.${index}.name` as keyof ProgramDto)}
          type="text"
          label="Name"
          error={errors?.[index]?.name?.message}
        />
      </Col>
      <Col sm={{ size: 12 }} md={{ size: 4 }} lg={{ size: 3 }} xl={{ size: 2 }}>
        <FloatingInput
          register={register(`options.${index}.price` as keyof ProgramDto)}
          type="number"
          label="Price"
          error={errors?.[index]?.price?.message}
        />
      </Col>
      <Col sm={{ size: 12 }} md={{ size: 4 }} lg={{ size: 3 }} xl={{ size: 2 }}>
        <FloatingInput
          register={register(`options.${index}.sedan` as keyof ProgramDto)}
          type="number"
          label="Sedan"
          error={errors?.[index]?.sedan?.message}
        />
      </Col>
      <Col sm={{ size: 12 }} md={{ size: 4 }} lg={{ size: 3 }} xl={{ size: 2 }}>
        <FloatingInput
          register={register(`options.${index}.suv` as keyof ProgramDto)}
          type="number"
          label="Suv"
          error={errors?.[index]?.suv?.message}
        />
      </Col>
      <Col sm={{ size: 12 }} md={{ size: 4 }} lg={{ size: 3 }} xl={{ size: 2 }}>
        <FloatingInput
          register={register(`options.${index}.pickup` as keyof ProgramDto)}
          type="number"
          label="Pickup"
          error={errors?.[index]?.pickup?.message}
        />
      </Col>
      <Col sm={{ size: 12 }} md={{ size: 4 }} lg={{ size: 3 }} xl={{ size: 2 }}>
        <FloatingInput
          register={register(`options.${index}.mini_bus` as keyof ProgramDto)}
          type="number"
          label="Mini Bus"
          error={errors?.[index]?.mini_bus?.message}
        />
      </Col>
      <Col sm={{ size: 12 }}>
        <Button block color="danger" onClick={removeOption(index)}>
          Delete option {index + 1}
        </Button>
      </Col>
    </Row>
  );
}

export default ProgramOption;
