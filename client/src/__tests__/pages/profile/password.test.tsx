import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moxios from 'moxios';
import axios from '../../../config/axios.config';
import Password from '../../../pages/profile/password';
import ReduxProvider from '../../__mocks__/provider';
import { getState } from '../../__mocks__/states';

describe('Testing Profile Password Page', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render', () => {
    const state = getState();
    render(
      <ReduxProvider state={state}>
        <Password user={state.auth.user!} />
      </ReduxProvider>
    );

    expect(screen.getByTestId('submit')).toBeTruthy();
  });

  it('should throw errors', async () => {
    const promise = Promise.resolve();
    const state = getState();
    render(
      <ReduxProvider state={state}>
        <Password user={state.auth.user!} />
      </ReduxProvider>
    );

    moxios.stubRequest('/profile', {
      status: 400,
      response: {
        errors: { password: 'required' },
      },
    });

    const password = screen.getByTestId('password');
    const cpassword = screen.getByTestId('confirm_password');

    userEvent.type(password, 'username@Q2');
    userEvent.type(cpassword, 'username@Q2');

    fireEvent.submit(screen.getByTestId('submit'));

    expect(password).toBeTruthy();
    await act(() => promise);
  });

  it('should update password', async () => {
    const promise = Promise.resolve();
    const state = getState();
    render(
      <ReduxProvider state={state}>
        <Password user={state.auth.user!} />
      </ReduxProvider>
    );

    moxios.stubRequest('/profile', {
      status: 200,
      response: { result: '' },
    });

    const password = screen.getByTestId('password');
    const cpassword = screen.getByTestId('confirm_password');
    const button = screen.getByTestId('submit');

    userEvent.type(password, 'username@Q2');
    userEvent.type(cpassword, 'username@Q2');

    fireEvent.submit(button);

    expect(password).toBeTruthy();
    await act(() => promise);
  });
});
