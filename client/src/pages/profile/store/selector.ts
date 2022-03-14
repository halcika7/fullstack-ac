import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../../../store/reducer';

export const profileSelector = createSelector(
  (state: AppState) => state.profile,
  profile => profile
);
