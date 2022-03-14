import { ToastBody, Alert } from 'reactstrap';

interface Props {
  message?: string;
  toggle: () => void;
}

function Toaster({ message, toggle }: Props) {
  return (
    <Alert isOpen={!!message} toggle={toggle}>
      <ToastBody>{message}</ToastBody>
    </Alert>
  );
}

export default Toaster;
