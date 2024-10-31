import { render, screen, waitFor } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import CharacterDetails from '../pages/CharacterDetails';
import { QueryClient, QueryClientProvider } from 'react-query';
import { StoreProvider } from '../store/StoreProvider';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('CharacterDetails', () => {
  beforeAll(() => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <CharacterDetails />
        </StoreProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders character details', async () => {
    const characterData = {
      name: 'Luke Skywalker',
      hair_color: 'brown',
      eye_color: 'blue',
      gender: 'male',
      homeworld: 'Tatooine',
    };

    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <CharacterDetails />
        </StoreProvider>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(characterData.name)).toBeInTheDocument();
      expect(
        screen.getByText(`${characterData.hair_color}`),
      ).toBeInTheDocument();
      expect(
        screen.getByText(`${characterData.eye_color}`),
      ).toBeInTheDocument();
      expect(screen.getByText(`${characterData.gender}`)).toBeInTheDocument();
      expect(
        screen.getByText(`${characterData.homeworld}`),
      ).toBeInTheDocument();
    });
  });

  test('nothing should load when no id is provided', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '' });

    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <CharacterDetails />
        </StoreProvider>
      </QueryClientProvider>,
    );

    expect(screen.queryByTestId('character-details')).not.toBeInTheDocument();
  });

  test('handles errors when loading homeworld', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '2' });

    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <CharacterDetails />
        </StoreProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/error loading homeworld/i)).toBeInTheDocument();
    });
  });

  test('handles errors when loading films', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '2' });

    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <CharacterDetails />
        </StoreProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/error loading films/i)).toBeInTheDocument();
    });
  });

  test('handles errors when loading starships', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '2' });

    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <CharacterDetails />
        </StoreProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/error loading starships/i)).toBeInTheDocument();
    });
  });

  test('handles errors when loading character details', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '3' });

    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <CharacterDetails />
        </StoreProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    await waitFor(() => {
      expect(
        screen.getByText(/error loading character details/i),
      ).toBeInTheDocument();
    });
  });

  test('adds character to favourites', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <CharacterDetails />
        </StoreProvider>
      </QueryClientProvider>,
    );

    // Simulate adding to favourites
    await waitFor(() => {
      const addButton = screen.getByText(/add to favourites/i);
      addButton.click();
    });
  });

  test('shows character as favourite', async () => {
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    localStorage.setItem(
      'favourites',
      JSON.stringify([
        {
          name: 'Luke Skywalker',
          url: '/1/',
        },
      ]),
    );
    render(
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <CharacterDetails />
        </StoreProvider>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/added to favourites/i)).toBeInTheDocument();
    });
  });
});
