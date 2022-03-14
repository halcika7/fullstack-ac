import { configureStore } from '@reduxjs/toolkit';
import { AppState, reducer } from './reducer';

export const store = (preloadedState?: AppState) =>
  configureStore({ reducer, preloadedState });
