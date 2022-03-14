import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useLocation, Navigate } from 'react-router-dom';
import { AppState } from '../../store/reducer';

interface Props {
  children: JSX.Element;
}

const authSelector = createSelector(
  (state: AppState) => state.auth,
  auth => auth.token
);

function ProtectedRoute({ children }: Props) {
  const token = useSelector(authSelector);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;
