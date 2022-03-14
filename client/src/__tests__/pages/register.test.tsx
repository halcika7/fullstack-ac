import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moxios from 'moxios';
import axios from '../../config/axios.config';
import Register from '../../pages/auth/register';
import ReduxProvider from '../__mocks__/provider';

describe('Testing Register Page', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render', () => {
    render(
      <ReduxProvider>
        <Register />
      </ReduxProvider>
    );
  });

  it('should fail to register customer', async () => {
    const promise = Promise.resolve();
    render(
      <ReduxProvider>
        <Register />
      </ReduxProvider>
    );

    const username = screen.getByTestId('username');
    const lastName = screen.getByTestId('last_name');
    const firstName = screen.getByTestId('first_name');
    const password = screen.getByTestId('password');
    const confirmPassword = screen.getByTestId('confirmPassword');

    userEvent.type(username, 'username');
    userEvent.type(lastName, 'username');
    userEvent.type(firstName, 'username');
    userEvent.type(password, 'username@Q2');
    userEvent.type(confirmPassword, 'username@Q2');

    moxios.stubRequest('/auth/register', {
      status: 400,
      response: {
        errors: {
          password: 'required',
          confirmPassword: 'confirmPassword jodiof sdfjosdi',
        },
      },
    });

    fireEvent.submit(screen.getByTestId('register'));

    expect(username).toBeTruthy();
    await act(() => promise);
  });

  it('should register customer', async () => {
    const promise = Promise.resolve();
    render(
      <ReduxProvider>
        <Register />
      </ReduxProvider>
    );

    const username = screen.getByTestId('username');
    const lastName = screen.getByTestId('last_name');
    const firstName = screen.getByTestId('first_name');
    const password = screen.getByTestId('password');
    const confirmPassword = screen.getByTestId('confirmPassword');

    userEvent.type(username, 'username');
    userEvent.type(lastName, 'username');
    userEvent.type(firstName, 'username');
    userEvent.type(password, 'username@Q2');
    userEvent.type(confirmPassword, 'username@Q2');

    moxios.stubRequest('/auth/register', {
      status: 200,
      response: {},
    });

    fireEvent.submit(screen.getByTestId('register'));

    expect(username).toBeTruthy();
    await act(() => promise);
  });
});
