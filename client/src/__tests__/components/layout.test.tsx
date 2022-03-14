import { fireEvent, render, screen } from '@testing-library/react';
import moxios from 'moxios';
import axios from '../../config/axios.config';
import Layout from '../../components/layouts/layout';
import ReduxProvider from '../__mocks__/provider';
import { getState } from '../__mocks__/states';

describe('Testing layout component', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render layout component', () => {
    render(
      <ReduxProvider>
        <Layout>Test</Layout>
      </ReduxProvider>
    );

    const main = screen.getByTestId('main');

    expect(main).toBeTruthy();
  });

  it('should render layout for customer', () => {
    render(
      <ReduxProvider state={getState('customer')}>
        <Layout>Test</Layout>
      </ReduxProvider>
    );

    const toggle = screen.getByTestId('toggle');

    fireEvent.click(toggle);

    expect(toggle).toBeTruthy();
  });

  it('should logout user', () => {
    render(
      <ReduxProvider state={getState()}>
        <Layout>Test</Layout>
      </ReduxProvider>
    );

    moxios.stubRequest('/auth/logout', {
      status: 200,
      response: {},
    });

    const signout = screen.getByTestId('signout');

    fireEvent.click(signout);

    expect(signout).toBeTruthy();
  });
});
