import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppState } from '../../store/reducer';

interface Props {
  children: JSX.Element;
  userRole: 'admin' | 'customer';
}

const authSelector = createSelector(
  (state: AppState) => state.auth,
  auth => auth.user!
);

function RoleRoute({ children, userRole }: Props) {
  const user = useSelector(authSelector);

  if (user.role !== userRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default RoleRoute;
