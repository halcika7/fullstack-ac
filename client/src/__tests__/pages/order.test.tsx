/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import moxios from 'moxios';
import axios from '../../config/axios.config';
import Order from '../../pages/order';
import ReduxProvider from '../__mocks__/provider';
import { getState } from '../__mocks__/states';

describe('Testing Create Order Page', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render', () => {
    render(
      <ReduxProvider state={getState('customer')}>
        <Order />
      </ReduxProvider>
    );

    expect(screen.getByTestId('dashboard')).toBeTruthy();
  });

  it('should test buttons and inputs', async () => {
    const state = getState('customer');
    const { container } = render(
      <ReduxProvider state={state}>
        <Order />
      </ReduxProvider>
    );

    moxios.stubRequest('/program', {
      status: 200,
      response: {
        result: state.programs.programs,
      },
    });

    fireEvent.mouseDown(container.querySelector('.list__dropdown-indicator')!, {
      button: 0,
    });

    const option = container.querySelector('.list__option');

    fireEvent.click(option!);

    const addOption = screen.getByTestId('add-option-0-0');
    const removeOption = screen.getByTestId('add-option-0-0');

    fireEvent.click(addOption);
    fireEvent.click(removeOption);
    fireEvent.click(addOption);

    expect(addOption).toBeTruthy();
  });

  it('should create order', async () => {
    const state = getState('customer');
    const { container } = render(
      <ReduxProvider state={state}>
        <Order />
      </ReduxProvider>
    );

    moxios.stubRequest('/program', {
      status: 200,
      response: {
        result: state.programs.programs,
      },
    });

    moxios.stubRequest('/orders', {
      status: 200,
      response: {
        result: {},
      },
    });

    fireEvent.mouseDown(container.querySelector('.list__dropdown-indicator')!, {
      button: 0,
    });

    const option = container.querySelector('.list__option');

    fireEvent.click(option!);

    const addOption = screen.getByTestId('add-option-0-0');

    fireEvent.click(addOption);

    expect(addOption).toBeTruthy();

    const out = await waitFor(() => screen.findByTestId('submit'));

    fireEvent.click(out);
  });

  it('should create one more order without discount', async () => {
    const state = getState('customer');
    state.auth.user!.number_of_orders = 8;
    const { container } = render(
      <ReduxProvider state={state}>
        <Order />
      </ReduxProvider>
    );

    moxios.stubRequest('/program', {
      status: 200,
      response: {
        result: state.programs.programs,
      },
    });

    moxios.stubRequest('/orders', {
      status: 200,
      response: {
        result: {},
      },
    });

    fireEvent.mouseDown(container.querySelector('.list__dropdown-indicator')!, {
      button: 0,
    });

    const option = container.querySelector('.list__option');

    fireEvent.click(option!);

    const addOption = screen.getByTestId('add-option-0-0');

    fireEvent.click(addOption);

    expect(addOption).toBeTruthy();

    const out = await waitFor(() => screen.findByTestId('submit'));

    fireEvent.click(out);
  });
});
