import { render, screen } from '@testing-library/react';
import FullSpinner from '../../components/spinner/full-spinner';

describe('Testing full spinner component', () => {
  it('should render full spinner', () => {
    render(<FullSpinner />);

    const spinner = screen.getByTestId('spinner');

    expect(spinner).toBeTruthy();
  });
});
