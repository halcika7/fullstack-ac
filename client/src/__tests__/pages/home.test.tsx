import { render, screen } from '@testing-library/react';
import Home from '../../pages/home';
import { ResizeObserver } from '../__mocks__/observer';
import ReduxProvider from '../__mocks__/provider';

describe('Testing Home Page', () => {
  window.ResizeObserver = ResizeObserver;
  it('should render', () => {
    render(
      <ReduxProvider>
        <Home />
      </ReduxProvider>
    );

    expect(screen.getByTestId('home')).toBeTruthy();
  });
});
