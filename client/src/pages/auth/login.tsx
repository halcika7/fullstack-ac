import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Container, Spinner } from 'reactstrap';
import FloatingInput from '../../components/inputs/floating-input';
import './index.scss';

interface FormInputs {
  username: string;
  password: string;
}

function Login() {
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
          register={{ ...register('username') }}
          type="text"
          label="Username"
        />

        <FloatingInput
          register={{ ...register('password') }}
          type="password"
          label="Password"
        />

        <Button type="submit" block color="success" className="submit-button">
          {isSubmitting ? <Spinner color="info">Loading...</Spinner> : 'Login'}
        </Button>
      </form>
    </Container>
  );
}

export default Login;
