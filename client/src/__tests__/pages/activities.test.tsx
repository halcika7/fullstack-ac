import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import moxios from 'moxios';
import axios from '../../config/axios.config';
import Activities from '../../pages/activities';
import ReduxProvider from '../__mocks__/provider';

describe('Testing Activities Page', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  it('should render', () => {
    render(
      <ReduxProvider>
        <Activities />
      </ReduxProvider>
    );
  });

  it('should get activities', async () => {
    moxios.stubRequest('/activities', {
      status: 200,
      response: {
        result: [
          {
            _id: 'adiokaspod',
            activity_type: 'order-created',
            details: {},
            customer: 'sdfjiojdof',
            createdAt: new Date().toLocaleDateString(),
          },
        ],
      },
    });
    render(
      <ReduxProvider>
        <Activities />
      </ReduxProvider>
    );

    const out = await waitFor(() => screen.findByTestId('load-more'));
    expect(out).toBeTruthy();

    fireEvent.click(out);
  });

  it('should not get activities', async () => {
    moxios.stubRequest('/activities', {
      status: 200,
      response: { result: [] },
    });
    render(
      <ReduxProvider>
        <Activities />
      </ReduxProvider>
    );

    expect(screen.getByTestId('theader')).toBeTruthy();
  });
});
