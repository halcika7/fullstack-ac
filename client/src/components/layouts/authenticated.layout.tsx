import { createSelector } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/reducer';
import Sidebar from '../sidebar';
import './index.scss';

type Props = {
  children: ReactNode;
};

const roleSelector = createSelector(
  (state: AppState) => state.auth.user,
  user => user!.role
);

function AuthenticatedLayout({ children }: Props) {
  const role = useSelector(roleSelector);
  return (
    <div className="auth-layout">
      <Sidebar role={role} />
      {children}
    </div>
  );
}

export default AuthenticatedLayout;
