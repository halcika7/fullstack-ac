import { Spinner } from 'reactstrap';
import './index.scss';

function FullSpinner() {
  return (
    <div className="spinner-wrapper">
      <Spinner animation="border" color="primary" />
    </div>
  );
}
export default FullSpinner;
