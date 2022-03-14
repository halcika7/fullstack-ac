import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import moxios from 'moxios';
import axios from '../../config/axios.config';
import Orders from '../../pages/orders';
import ReduxProvider from '../__mocks__/provider';
import { getState } from '../__mocks__/states';

describe('Testing Orders Page', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render', () => {
    render(
      <ReduxProvider state={getState()}>
        <Orders />
      </ReduxProvider>
    );
  });

  it('should load more', async () => {
    const state = getState();

    moxios.stubRequest('/orders', {
      status: 200,
      response: {
        result: [{ ...state.orders.orders[0], _id: 'asdjoasdidioasjod' }],
      },
    });

    render(
      <ReduxProvider state={state}>
        <Orders />
      </ReduxProvider>
    );

    const out = await waitFor(() => screen.findByTestId('load-more'));

    fireEvent.click(out);

    expect(out).toBeTruthy();
  });

  it('should not load more', async () => {
    const state = getState();

    moxios.stubRequest('/orders', {
      status: 200,
      response: { result: [] },
    });

    render(
      <ReduxProvider state={state}>
        <Orders />
      </ReduxProvider>
    );

    expect(screen.getByTestId('theader')).toBeTruthy();
  });
});
