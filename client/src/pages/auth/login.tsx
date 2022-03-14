import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Card, CardBody, Container, Spinner } from 'reactstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import { useEffect } from 'react';
import FloatingInput from '../../components/inputs/floating-input';
import { schema } from './yup/login.yup';
import { login } from './store/actions';
import { authActions } from './store/slice';
import Toaster from '../../components/toast';
import useNavigateToDashboard from '../../hooks/useNavigateToDashboard';
import { authState } from './store/selector';
import { LoginDto } from './store/types';

function Login() {
  const dispatch = useDispatch();
  useNavigateToDashboard();
  const { authErrors, message } = useSelector(authState);

  const {
    formState: { isSubmitting, errors, isValid },
    handleSubmit,
    register,
    clearErrors,
    setError,
  } = useForm<LoginDto>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const onSubmit: SubmitHandler<LoginDto> = async data => {
    clearErrors();
    await dispatch(login(data));
  };

  const toggleToaster = () => {
    dispatch(authActions.resetValidationErrors());
  };

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
      dispatch(authActions.resetValidationErrors());
    };
  }, [dispatch]);

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
            />

            <FloatingInput
              register={register('password')}
              type="password"
              label="Password"
              error={errors.password?.message}
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
