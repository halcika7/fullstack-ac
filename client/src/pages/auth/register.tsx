import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Container, Spinner } from 'reactstrap';
import FloatingInput from '../../components/inputs/floating-input';
import './index.scss';

interface FormInputs {
  username: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
}

function Register() {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log('🚀 ~ file: login.tsx ~ line 21 ~ Login ~ data', data);
  };
  return (
    <Container className="auth-content">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FloatingInput
          label="Username"
          type="text"
          register={{ ...register('username') }}
        />
        <FloatingInput
          label="First Name"
          type="text"
          register={{ ...register('first_name') }}
        />
        <FloatingInput
          label="Last Name"
          type="text"
          register={{ ...register('last_name') }}
        />
        <FloatingInput
          label="Password"
          type="password"
          register={{ ...register('password') }}
        />
        <FloatingInput
          label="Confirm Password"
          type="password"
          register={{ ...register('confirm_password') }}
        />

        <Button type="submit" block color="success" className="submit-button">
          {isSubmitting ? (
            <Spinner color="info">Loading...</Spinner>
          ) : (
            'Register'
          )}
        </Button>
      </form>
    </Container>
  );
}

export default Register;
