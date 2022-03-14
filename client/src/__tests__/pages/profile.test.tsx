import { render } from '@testing-library/react';
import moxios from 'moxios';
import axios from '../../config/axios.config';
import Profile from '../../pages/profile';
import ReduxProvider from '../__mocks__/provider';
import { getState } from '../__mocks__/states';

describe('Testing Profile Page', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render', () => {
    render(
      <ReduxProvider state={getState()}>
        <Profile />
      </ReduxProvider>
    );
  });
});
