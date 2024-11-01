import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import CharacterList from '../pages/CharacterList';
import { fetchCharacters } from '../api/swapi';
import { MemoryRouter } from 'react-router-dom';
import { jest } from '@jest/globals';
import { StoreProvider } from '../store/StoreProvider';
import * as ReactQuery from 'react-query';
import * as ReactRouterDom from 'react-router-dom';

const queryClient = new QueryClient();
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actualReactRouterDom: typeof ReactRouterDom =
    jest.requireActual('react-router-dom');

  return {
    ...actualReactRouterDom,
    useNavigate: () => mockNavigate,
  };
});

describe('CharacterList Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test('renders CharacterList component', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <MemoryRouter>
            <CharacterList />
          </MemoryRouter>
        </StoreProvider>
      </QueryClientProvider>,
    );
    expect(screen.getByPlaceholderText('Search by name')).toBeInTheDocument();
  });

  test('calls fetchCharacters on component load', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <MemoryRouter>
            <CharacterList />
          </MemoryRouter>
        </StoreProvider>
      </QueryClientProvider>,
    );

    await waitFor(() => expect(fetchCharacters).toHaveBeenCalledTimes(1));
  });

  test('displays loading indicator when data is loading', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <MemoryRouter>
            <CharacterList />
          </MemoryRouter>
        </StoreProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('shows error message if data fetch fails', async () => {
    jest.spyOn(ReactQuery, 'useQuery').mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      error: true,
    } as ReactQuery.UseQueryResult);
    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <MemoryRouter>
            <CharacterList />
          </MemoryRouter>
        </StoreProvider>
      </QueryClientProvider>,
    );

    await waitFor(() =>
      expect(screen.getByText(/Error loading characters/i)).toBeInTheDocument(),
    );
  });

  test('updates search term and triggers debounce', async () => {
    jest.useFakeTimers();
    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <MemoryRouter>
            <CharacterList />
          </MemoryRouter>
        </StoreProvider>
      </QueryClientProvider>,
    );

    const searchInput = screen.getByPlaceholderText('Search by name');
    fireEvent.change(searchInput, { target: { value: 'Leia' } });

    jest.advanceTimersByTime(300);

    await waitFor(() =>
      expect(fetchCharacters).toHaveBeenCalledWith(expect.anything(), 'Leia'),
    );

    const nextButton = screen.getByText('▶');
    fireEvent.click(nextButton);

    await waitFor(() =>
      expect(fetchCharacters).toHaveBeenCalledWith(2, 'Leia'),
    );
    jest.useRealTimers();
  });

  test('renders CharacterCard components after data is loaded', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <MemoryRouter>
            <CharacterList />
          </MemoryRouter>
        </StoreProvider>
      </QueryClientProvider>,
    );

    await waitFor(() => screen.getByText('Luke Skywalker'));
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });

  test('navigate to CharacterDetailsCard components after data is loaded and the card is clicked', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <MemoryRouter>
            <CharacterList />
          </MemoryRouter>
        </StoreProvider>
      </QueryClientProvider>,
    );

    await waitFor(() => screen.getByText('Luke Skywalker'));
    fireEvent.click(screen.getByText('Luke Skywalker'));
    expect(mockNavigate).toHaveBeenCalledWith('/character/1');
  });

  test('navigate to CharacterDetailsCard components after data is loaded and the card is selected using keyboard enter key', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <MemoryRouter>
            <CharacterList />
          </MemoryRouter>
        </StoreProvider>
      </QueryClientProvider>,
    );

    await waitFor(() => screen.getByText('Luke Skywalker'));
    fireEvent.keyPress(screen.getByText('Luke Skywalker'), {
      key: 'Enter',
      code: 'Enter',
    });
    expect(mockNavigate).toHaveBeenCalledWith('/character/1');
  });

  test('navigate to CharacterDetailsCard components after data is loaded and the card is selected using keyboard space key', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <MemoryRouter>
            <CharacterList />
          </MemoryRouter>
        </StoreProvider>
      </QueryClientProvider>,
    );

    await waitFor(() => screen.getByText('Luke Skywalker'));
    fireEvent.keyPress(screen.getByText('Luke Skywalker'), {
      key: ' ',
      code: ' ',
    });
    expect(mockNavigate).toHaveBeenCalledWith('/character/1');
  });

  test('pagination component works as expected', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <MemoryRouter>
            <CharacterList />
          </MemoryRouter>
        </StoreProvider>
      </QueryClientProvider>,
    );

    const nextButton = screen.getByText('▶');
    fireEvent.click(nextButton);

    await waitFor(() => expect(fetchCharacters).toHaveBeenCalledWith(2, ''));
  });
});
