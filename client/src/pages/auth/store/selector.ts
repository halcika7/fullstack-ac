import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../../store/reducer';

export const authState = createSelector(
  (state: AppState) => state.auth,
  auth => ({
    authErrors: auth.errors,
    message: auth.message,
  })
);
