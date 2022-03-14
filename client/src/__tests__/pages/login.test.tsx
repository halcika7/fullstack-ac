import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moxios from 'moxios';
import axios from '../../config/axios.config';
import Login from '../../pages/auth/login';
import ReduxProvider from '../__mocks__/provider';
import { getState } from '../__mocks__/states';

describe('Testing Login Page', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render', () => {
    render(
      <ReduxProvider state={getState()}>
        <Login />
      </ReduxProvider>
    );
    expect(screen.getByTestId('username')).toBeTruthy();
  });

  it('should click and type in inputs', async () => {
    const promise = Promise.resolve();
    render(
      <ReduxProvider>
        <Login />
      </ReduxProvider>
    );

    const usernameEl = screen.getByTestId('username');
    const passwordEl = screen.getByTestId('password');
    expect(usernameEl).toBeInTheDocument();

    userEvent.click(passwordEl);

    userEvent.type(usernameEl, 'aa');
    expect(usernameEl).toHaveValue('aa');
    await act(() => promise);
  });

  it('should fail to login', async () => {
    const promise = Promise.resolve();
    render(
      <ReduxProvider>
        <Login />
      </ReduxProvider>
    );

    const usernameEl = screen.getByTestId('username');
    const passwordEl = screen.getByTestId('password');
    const submitEl = screen.getByText(/login/i);

    expect(submitEl).toBeInTheDocument();

    moxios.stubRequest('/auth/login', {
      status: 400,
      response: {
        errors: { username: 'required' },
      },
    });

    userEvent.type(usernameEl, 'customer');
    userEvent.type(passwordEl, 'password');

    fireEvent.submit(submitEl);

    expect(usernameEl).toHaveValue('customer');
    expect(passwordEl).toHaveValue('password');
    await act(() => promise);
  });

  it('should login user', async () => {
    const promise = Promise.resolve();
    render(
      <ReduxProvider>
        <Login />
      </ReduxProvider>
    );

    const usernameEl = screen.getByTestId('username');
    const passwordEl = screen.getByTestId('password');
    const submitEl = screen.getByText(/login/i);

    expect(submitEl).toBeInTheDocument();

    moxios.stubRequest('/auth/login', {
      status: 200,
      response: {
        token: 'token',
      },
    });

    userEvent.type(usernameEl, 'customer');
    userEvent.type(passwordEl, 'password');

    fireEvent.submit(submitEl);

    expect(usernameEl).toHaveValue('customer');
    expect(passwordEl).toHaveValue('password');
    await act(() => promise);
  });
});
