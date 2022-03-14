import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import moxios from 'moxios';
import axios from '../../config/axios.config';
import Program from '../../pages/programs/program';
import ReduxProvider from '../__mocks__/provider';
import { getState } from '../__mocks__/states';

describe('Testing Program Page', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render', () => {
    render(
      <ReduxProvider>
        <Program />
      </ReduxProvider>
    );
  });

  it('should throw errors', async () => {
    const promise = Promise.resolve();
    const state = getState();
    render(
      <ReduxProvider state={state}>
        <Program />
      </ReduxProvider>
    );

    moxios.stubRequest('/program', {
      status: 400,
      response: {
        error: { name: 'ajpof' },
      },
    });

    const addOption = screen.getByRole('option');
    const name = screen.getByTestId('name');

    userEvent.type(name, 'name@Q2');

    fireEvent.click(addOption);

    const nameOption = screen.getByTestId('name1');

    userEvent.type(nameOption, 'name@Q2');

    fireEvent.submit(screen.getByTestId('submit'));

    expect(name).toBeTruthy();
    await act(() => promise);
  });

  it('should create program', async () => {
    const promise = Promise.resolve();
    const state = getState();
    render(
      <ReduxProvider state={state}>
        <Program />
      </ReduxProvider>
    );

    moxios.stubRequest('/program', {
      status: 200,
      response: { result: 'Success' },
    });

    const addOption = screen.getByRole('option');
    const name = screen.getByTestId('name');

    userEvent.type(name, 'name@Q2');

    fireEvent.click(addOption);

    const nameOption = screen.getByTestId('name1');

    userEvent.type(nameOption, 'name@Q2');

    fireEvent.submit(screen.getByTestId('submit'));

    expect(name).toBeTruthy();
    await act(() => promise);
  });
});
