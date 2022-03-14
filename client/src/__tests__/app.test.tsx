import { render, screen, waitFor } from '@testing-library/react';
import moxios from 'moxios';
import App from '../App';
import axios from '../config/axios.config';
import { ResizeObserver } from './__mocks__/observer';
import ReduxProvider from './__mocks__/provider';
import { getState } from './__mocks__/states';

describe('Testing app component', () => {
  window.ResizeObserver = ResizeObserver;
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('should render', async () => {
    moxios.stubRequest('/auth/me', {
      status: 200,
      response: {
        result: { username: 'akdpos', role: 'admin' },
      },
    });
    render(
      <ReduxProvider>
        <App />
      </ReduxProvider>
    );

    const out = await waitFor(() => screen.findByTestId('main'));

    expect(out).toBeTruthy();
  });

  it('should mock', () => {
    render(
      <ReduxProvider state={getState()}>
        <App />
      </ReduxProvider>
    );

    moxios.stubRequest('/auth/refresh', {
      status: 401,
    });
  });

  it('should mock customer', () => {
    render(
      <ReduxProvider state={getState('customer')}>
        <App />
      </ReduxProvider>
    );

    moxios.stubRequest('/auth/refresh', {
      status: 401,
    });
  });
});
