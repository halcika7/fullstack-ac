import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Spinner } from 'reactstrap';
import FloatingInput from '../../../components/inputs/floating-input';
import { authActions } from '../../auth/store/slice';
import { User } from '../../auth/store/types';
import { updateProfile } from '../store/actions';
import { profileSelector } from '../store/selector';
import { profileActions } from '../store/slice';
import { schema } from './schema';

type Props = { user: User };

type Inputs = {
  username: string;
  first_name: string;
  last_name: string;
};

function Info({ user }: Props) {
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);

  const {
    formState: { isSubmitting, errors, isValid },
    handleSubmit,
    register,
    clearErrors,
    setError,
    setValue,
    getValues,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'all',
  });

  const onSubmit: SubmitHandler<Inputs> = async data => {
    clearErrors();
    dispatch(updateProfile({ ...data, _id: user._id }));
  };

  useEffect(() => {
    if (profile.errors) {
      setError('username', { message: profile.errors.username });
      setError('first_name', { message: profile.errors.first_name });
      setError('last_name', { message: profile.errors.last_name });
    }
  }, [profile.errors, setError]);

  useEffect(() => {
    setValue('username', user.username);
    setValue('first_name', user.first_name);
    setValue('last_name', user.last_name);
  }, [user, setValue]);

  useEffect(() => {
    if (profile.message) {
      dispatch(authActions.updateUser(getValues()));
    }
  }, [profile.message, dispatch, getValues]);

  return (
    <Card style={{ marginBottom: '2rem' }}>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FloatingInput
            register={register('username')}
            type="text"
            label="Username"
            error={errors.username?.message}
          />

          <FloatingInput
            register={register('first_name')}
            type="text"
            label="First Name"
            error={errors.first_name?.message}
          />

          <FloatingInput
            register={register('last_name')}
            type="text"
            label="Last Name"
            error={errors.last_name?.message}
          />

          <Button
            type="submit"
            color="success"
            className="submit-button"
            disabled={!isValid}
          >
            {isSubmitting ? (
              <Spinner color="info">Loading...</Spinner>
            ) : (
              'Update info'
            )}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default Info;
