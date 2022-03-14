import { render } from '@testing-library/react';
import moxios from 'moxios';
import axios from '../config/axios.config';
import { ResizeObserver } from './__mocks__/observer';

import Index from '../startup';
import { getState } from './__mocks__/states';

describe('Testing index component', () => {
  window.ResizeObserver = ResizeObserver;
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render', async () => {
    moxios.stubRequest('/auth/me', {
      status: 400,
      response: {},
    });
    moxios.stubRequest('/auth/refresh', {
      status: 401,
      response: {},
    });
    render(<Index />);
  });

  it('should render with state', async () => {
    moxios.stubRequest('/auth/me', {
      status: 400,
      response: {},
    });
    moxios.stubRequest('/auth/refresh', {
      status: 401,
      response: {},
    });
    render(<Index testState={getState()} />);
  });
});
