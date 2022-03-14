import { render, screen } from '@testing-library/react';
import Footer from '../../components/footer';

describe('Testing footer component', () => {
  it('should render footer', () => {
    render(<Footer />);

    const footer = screen.getByTestId('footer');

    expect(footer).toBeTruthy();
  });
});
