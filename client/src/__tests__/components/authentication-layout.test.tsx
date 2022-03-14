import { render, screen } from '@testing-library/react';
import ReduxProvider from '../__mocks__/provider';
import AuthenticatedLayout from '../../components/layouts/authenticated.layout';

describe('Testing authentication layout component', () => {
  it('should render layout component', () => {
    render(
      <ReduxProvider>
        <AuthenticatedLayout>Test</AuthenticatedLayout>
      </ReduxProvider>
    );

    const sidebar = screen.getByTestId('sidebar');

    expect(sidebar).toBeTruthy();
  });
});
