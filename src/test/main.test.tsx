import { render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from '../App';
import { StoreProvider } from '../store/StoreProvider';

const queryClient = new QueryClient();

describe('Index file', () => {
  it('renders App component wrapped with providers', async () => {
    const { getByText, getAllByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </QueryClientProvider>,
    );

    expect(getByText('Star Wars')).toBeInTheDocument();
    expect(getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      const card = getAllByTestId('character-card');
      expect(card.length).toBe(2);
    });
  });
});
