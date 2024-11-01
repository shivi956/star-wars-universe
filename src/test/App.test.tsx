import { fireEvent, render, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from '../App';
import { StoreProvider } from '../store/StoreProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
global['Request'] = jest.fn().mockImplementation(() => ({
  signal: {
    removeEventListener: () => {},
    addEventListener: () => {},
  },
}));
describe('Index file', () => {
  test('renders App component wrapped with providers', async () => {
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

  test('renders characterDetails card', async () => {
    const { getAllByTestId, getByText, queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const card = getAllByTestId('character-card');
      expect(card.length).toBe(2);
      fireEvent.click(card[0]);
    });

    expect(getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByText('Loading...')).not.toBeInTheDocument();
    });

    const detailsCard = getAllByTestId('characterDetails-card');
    expect(detailsCard.length).toBe(1);
  });

  test('renders favouritePage', async () => {
    const { getByText, getAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const favouriteOption = getByText(/favourites/i);
      fireEvent.click(favouriteOption);
    });

    const favouriteText = getAllByText(/favourites/i);
    expect(favouriteText.length).toBe(2);
  });

  test('should navigate to the error page for unknown routes', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </QueryClientProvider>,
    );

    const link = document.createElement('a');
    link.href = '/unknownUrl';
    link.textContent = 'Link';
    link.onclick = (e) => {
      e.preventDefault();
      window.history.pushState({}, '', '/unknownUrl');
      window.dispatchEvent(new PopStateEvent('popstate'));
    };
    document.body.appendChild(link);
    fireEvent.click(link);

    await waitFor(() =>
      expect(getByText('404 - Not Found')).toBeInTheDocument(),
    );
  });
});
