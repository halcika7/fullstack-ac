import { AnyAction, combineReducers, Store } from '@reduxjs/toolkit';
import auth from '../pages/auth/store/slice';
import dashboard from '../pages/dashboard/store/slice';
import activities from '../pages/activities/store/slice';
import orders from '../pages/orders/store/slice';
import programs from '../pages/programs/store/slice';
import profile from '../pages/profile/store/slice';

export const reducer = combineReducers({
  auth,
  dashboard,
  activities,
  orders,
  programs,
  profile,
});

export type AppState = ReturnType<typeof reducer>;

export type AppStore = Store<AppState, AnyAction>;

export type ThunkApiFields = { state: AppState };
