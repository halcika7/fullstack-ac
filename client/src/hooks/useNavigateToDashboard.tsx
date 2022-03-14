import { createSelector } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../store/reducer';

const authState = createSelector(
  (state: AppState) => state.auth,
  auth => auth.user
);

function useNavigateToDashboard() {
  const user = useSelector(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);
}

export default useNavigateToDashboard;
