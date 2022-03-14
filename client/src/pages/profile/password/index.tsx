import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Spinner } from 'reactstrap';
import FloatingInput from '../../../components/inputs/floating-input';
import { User } from '../../auth/store/types';
import { updateProfile } from '../store/actions';
import { profileSelector } from '../store/selector';
import { schema } from './schema';

type Props = { user: User };

type Inputs = {
  password: string;
  confirmPassword: string;
};

function Password({ user }: Props) {
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);

  const {
    formState: { isSubmitting, errors, isValid },
    handleSubmit,
    register,
    clearErrors,
    setError,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    clearErrors();
    await dispatch(
      updateProfile({
        ...data,
        _id: user._id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
      })
    );
  };

  useEffect(() => {
    if (profile.errors) {
      setError('password', { message: profile.errors.password });
      setError('confirmPassword', { message: profile.errors.confirmPassword });
    }
  }, [profile.errors, setError]);

  return (
    <Card style={{ marginBottom: '2rem' }}>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FloatingInput
            register={register('password')}
            type="password"
            label="Password"
            error={errors.password?.message}
            testId="password"
          />

          <FloatingInput
            register={register('confirmPassword')}
            type="password"
            label="Confirm Password"
            error={errors.confirmPassword?.message}
            testId="confirm_password"
          />

          <Button
            type="submit"
            color="success"
            className="submit-button"
            disabled={!isValid}
            data-testid="submit"
          >
            {isSubmitting ? (
              <Spinner color="info">Loading...</Spinner>
            ) : (
              'Update Password'
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default Password;
