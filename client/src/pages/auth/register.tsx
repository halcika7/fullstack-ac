import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Card, CardBody, Container, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';

import FloatingInput from '../../components/inputs/floating-input';
import Toaster from '../../components/toast';

import useNavigateToDashboard from '../../hooks/useNavigateToDashboard';

import { schema } from './yup/register.yup';
import { register as registerAction } from './store/actions';
import { authActions } from './store/slice';
import { authState } from './store/selector';
import { RegisterDto } from './store/types';

import './index.scss';

function Register() {
  const dispatch = useDispatch();
  useNavigateToDashboard();
  const { authErrors, message } = useSelector(authState);

  const {
    formState: { isSubmitting, errors, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm<RegisterDto>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<RegisterDto> = data => {
    dispatch(registerAction(data));
  };

  const toggleToaster = useCallback(() => {
    dispatch(authActions.resetValidationErrors());
  }, [dispatch]);

  useEffect(() => {
    if (authErrors) {
      Object.entries(authErrors).forEach(([key, value]) => {
        setError(key as keyof RegisterDto, {
          message: value,
        });
      });
    }
  }, [authErrors, setError]);

  useEffect(() => {
    return () => {
      toggleToaster();
    };
  }, [toggleToaster]);

  return (
    <Container className="auth-content">
      <Card>
        <CardBody>
          <Toaster message={message} toggle={toggleToaster} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FloatingInput
              label="Username"
              type="text"
              register={register('username')}
              error={errors.username?.message}
              testId="username"
            />
            <FloatingInput
              label="First Name"
              type="text"
              register={register('first_name')}
              error={errors.first_name?.message}
              testId="first_name"
            />
            <FloatingInput
              label="Last Name"
              type="text"
              register={register('last_name')}
              error={errors.last_name?.message}
              testId="last_name"
            />
            <FloatingInput
              label="Password"
              type="password"
              register={register('password')}
              error={errors.password?.message}
              testId="password"
            />
            <FloatingInput
              label="Confirm Password"
              type="password"
              register={register('confirmPassword')}
              error={errors.confirmPassword?.message}
              testId="confirmPassword"
            />

            <Button
              type="submit"
              block
              color="success"
              className="submit-button"
              disabled={!isValid}
              data-testid="register"
            >
              {isSubmitting ? (
                <Spinner color="info">Loading...</Spinner>
              ) : (
                'Register'
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Register;
