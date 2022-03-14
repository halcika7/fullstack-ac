import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../../components/sidebar';

describe('Testing sidebar component', () => {
  it('should render admin sidebar', () => {
    render(
      <BrowserRouter>
        <Sidebar role="admin" />
      </BrowserRouter>
    );

    const sidebar = screen.getByTestId('sidebar');

    expect(sidebar).toBeTruthy();
  });

  it('should render customer sidebar', () => {
    render(
      <BrowserRouter>
        <Sidebar role="customer" />
      </BrowserRouter>
    );

    const sidebar = screen.getByTestId('sidebar');

    expect(sidebar).toBeTruthy();
  });
});
