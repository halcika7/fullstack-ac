import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, Container, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';

import FloatingInput from '../../components/inputs/floating-input';
import Toaster from '../../components/toast';

import { schema } from './yup/login.yup';

import useNavigateToDashboard from '../../hooks/useNavigateToDashboard';

import { login } from './store/actions';
import { authActions } from './store/slice';
import { authState } from './store/selector';
import { LoginDto } from './store/types';

import './index.scss';

function Login() {
  const dispatch = useDispatch();
  useNavigateToDashboard();
  const { authErrors, message } = useSelector(authState);

  const {
    formState: { isSubmitting, errors, isValid },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginDto>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const onSubmit: SubmitHandler<LoginDto> = async data => {
    dispatch(login(data));
  };

  const toggleToaster = useCallback(() => {
    dispatch(authActions.resetValidationErrors());
  }, [dispatch]);

  useEffect(() => {
    if (authErrors) {
      Object.entries(authErrors).forEach(([key, value]) => {
        setError(key as keyof LoginDto, {
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
              register={register('username')}
              type="text"
              label="Username"
              error={errors.username?.message}
              testId="username"
            />

            <FloatingInput
              register={register('password')}
              type="password"
              label="Password"
              error={errors.password?.message}
              testId="password"
            />

            <Button
              type="submit"
              block
              color="success"
              className="submit-button"
              disabled={!isValid}
            >
              {isSubmitting ? (
                <Spinner color="info">Loading...</Spinner>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default Login;
