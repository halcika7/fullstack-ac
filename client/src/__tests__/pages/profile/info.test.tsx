import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moxios from 'moxios';
import axios from '../../../config/axios.config';
import Info from '../../../pages/profile/info';
import ReduxProvider from '../../__mocks__/provider';
import { getState } from '../../__mocks__/states';

describe('Testing Profile Info Page', () => {
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
        <Info user={state.auth.user!} />
      </ReduxProvider>
    );

    expect(screen.getByTestId('submit')).toBeTruthy();
  });

  it('should, throw errors', async () => {
    const promise = Promise.resolve();
    const state = getState();
    render(
      <ReduxProvider state={state}>
        <Info user={state.auth.user!} />
      </ReduxProvider>
    );

    moxios.stubRequest('/profile', {
      status: 400,
      response: {
        errors: { username: 'required' },
      },
    });

    const username = screen.getByTestId('username');
    const lastName = screen.getByTestId('last_name');
    const firstName = screen.getByTestId('first_name');

    userEvent.type(username, 'username');
    userEvent.type(lastName, 'username');
    userEvent.type(firstName, 'username');

    fireEvent.submit(screen.getByTestId('submit'));

    expect(username).toBeTruthy();
    await act(() => promise);
  });

  it('should update info', async () => {
    const promise = Promise.resolve();
    const state = getState();
    render(
      <ReduxProvider state={state}>
        <Info user={state.auth.user!} />
      </ReduxProvider>
    );

    moxios.stubRequest('/profile', {
      status: 200,
      response: { result: '' },
    });

    const username = screen.getByTestId('username');
    const lastName = screen.getByTestId('last_name');
    const firstName = screen.getByTestId('first_name');
    const button = screen.getByTestId('submit');

    userEvent.type(username, 'username');
    userEvent.type(lastName, 'username');
    userEvent.type(firstName, 'username');

    fireEvent.submit(button);

    expect(username).toBeTruthy();
    await act(() => promise);
  });
});
