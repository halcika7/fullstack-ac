import { yupResolver } from '@hookform/resolvers/yup';
import { createSelector } from '@reduxjs/toolkit';
import { useCallback, useEffect } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Container, Spinner } from 'reactstrap';
import FloatingInput from '../../../components/inputs/floating-input';
import Toaster from '../../../components/toast';
import { AppState } from '../../../store/reducer';
import { createProgram } from '../store/actions';
import { programActions } from '../store/slice';
import { ProgramDto } from '../store/types';
import ProgramOption from './options';
import { schema } from './schema';

const programSelector = createSelector(
  (state: AppState) => state.programs.errors,
  (state: AppState) => state.programs.message,
  (errors, message) => ({ message, errors })
);

const option = {
  name: '',
  mini_bus: 0,
  pickup: 0,
  price: 1,
  sedan: 0,
  suv: 0,
};

function ProgramCreate() {
  const dispatch = useDispatch();
  const programState = useSelector(programSelector);
  const navigate = useNavigate();

  const {
    formState: { isSubmitting, errors, isValid },
    handleSubmit,
    register,
    clearErrors,
    control,
  } = useForm<ProgramDto>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  });

  const onSubmit: SubmitHandler<ProgramDto> = async data => {
    clearErrors();
    dispatch(createProgram(data));
  };

  const addOption = () => append(option);

  const removeOption = (index: number) => () => remove(index);

  const toggleToaster = useCallback(() => {
    dispatch(programActions.resetState());
  }, [dispatch]);

  useEffect(() => {
    if (programState.message) {
      navigate('/programs');
    }
  }, [navigate, programState.message]);

  useEffect(() => {
    return () => {
      toggleToaster();
    };
  }, [toggleToaster]);

  return (
    <Container style={{ paddingTop: '2rem' }}>
      <Toaster
        message={programState.errors ? 'Please check input values' : ''}
        toggle={toggleToaster}
      />
      <Card style={{ marginBottom: '2rem' }}>
        <CardBody>
          <Button
            style={{ marginBottom: '2rem' }}
            color="success"
            onClick={addOption}
          >
            Add Option
          </Button>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FloatingInput
              register={register('name')}
              type="text"
              label="Name"
              error={errors.name?.message}
            />

            <h3>Options</h3>

            {fields.map((field, index) => {
              return (
                <ProgramOption
                  key={field.id}
                  errors={errors.options}
                  index={index}
                  register={register}
                  removeOption={removeOption}
                />
              );
            })}

            <Button
              type="submit"
              color="success"
              className="submit-button"
              disabled={!isValid}
            >
              {isSubmitting ? (
                <Spinner color="info">Loading...</Spinner>
              ) : (
                'Add program'
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default ProgramCreate;
