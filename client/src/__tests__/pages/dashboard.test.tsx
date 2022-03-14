import { render, screen } from '@testing-library/react';
import { stat } from 'fs/promises';
import moxios from 'moxios';
import axios from '../../config/axios.config';
import Dashboard from '../../pages/dashboard';
import ReduxProvider from '../__mocks__/provider';
import { getState } from '../__mocks__/states';

describe('Testing Dashboard Page', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render', () => {
    const state = getState();
    moxios.stubRequest('/orders/by-month', {
      status: 200,
      response: { result: state.dashboard.orders },
    });
    moxios.stubRequest('/facility-stats', {
      status: 200,
      response: { result: state.dashboard.stat },
    });
    render(
      <ReduxProvider state={state}>
        <Dashboard />
      </ReduxProvider>
    );

    expect(screen.getByTestId('dashboard')).toBeTruthy();
  });

  it('should render for customer', () => {
    render(
      <ReduxProvider state={getState('customer')}>
        <Dashboard />
      </ReduxProvider>
    );

    expect(screen.getByTestId('dashboard')).toBeTruthy();
  });
});
