import { render, screen } from '@testing-library/react';
import { Loading } from '../components/Loading';

describe('Loading', () => {
  it('renders the loading component', () => {
    render(<Loading />);
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveClass('text-3xl font-bold');
  });
});
