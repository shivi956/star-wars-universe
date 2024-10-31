import { render, screen, fireEvent } from '@testing-library/react';
import Favourites from '../pages/Favourites';
import { StoreProvider } from '../store/StoreProvider';
import { store } from '../store/store';
import { setFavourites } from '../store/slice/favouriteSlice';
import { Character } from '../utils/types';

describe('Favourites Component', () => {
  const testCharacter: Character = {
    name: 'Luke Skywalker',
    height: '172',
    gender: 'male',
    homeworld: 'Tatooine',
    hair_color: '',
    eye_color: '',
    films: [],
    starships: [],
    url: '',
  };

  beforeEach(() => {
    // Reset the favourites in the Redux store before each test
    store.dispatch(setFavourites([]));
  });

  it('displays a character card for each favourite character', () => {
    store.dispatch(setFavourites([testCharacter]));

    render(
      <StoreProvider>
        <Favourites />
      </StoreProvider>,
    );

    const characterCard = screen.getByText('Luke Skywalker');
    expect(characterCard).toBeInTheDocument();
  });

  it('opens and closes the edit character modal', () => {
    store.dispatch(setFavourites([testCharacter]));

    render(
      <StoreProvider>
        <Favourites />
      </StoreProvider>,
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    const editModal = screen.getByTestId('modal');
    expect(editModal).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(editModal).not.toBeInTheDocument();
  });

  it('removes a character from favourites', () => {
    store.dispatch(setFavourites([testCharacter]));

    render(
      <StoreProvider>
        <Favourites />
      </StoreProvider>,
    );

    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    const characterCard = screen.queryByText('Luke Skywalker');
    expect(characterCard).not.toBeInTheDocument();
  });

  it("updates a character's height and gender in the modal", () => {
    store.dispatch(setFavourites([testCharacter]));

    render(
      <StoreProvider>
        <Favourites />
      </StoreProvider>,
    );

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    const heightInput = screen.getByLabelText(/height/i);
    const genderRadioFemale = screen.getByLabelText(/female/i);
    const saveButton = screen.getByRole('button', { name: /save/i });

    // Update height and select gender as 'Female'
    fireEvent.change(heightInput, { target: { value: 180 } });
    fireEvent.click(genderRadioFemale);
    fireEvent.click(saveButton);

    const updatedCharacter = store
      .getState()
      .favourites.find((char) => char.name === 'Luke Skywalker');

    expect(updatedCharacter).toEqual({
      ...testCharacter,
      height: '180',
      gender: 'female',
    });

    // Check if the updated values are displayed
    const updatedHeight = screen.getByText('180');
    const updatedGender = screen.getByText('female');

    expect(updatedHeight).toBeInTheDocument();
    expect(updatedGender).toBeInTheDocument();
  });
});
