import { renderHook, act } from '@testing-library/react';
import { useFavourites } from '../hooks/useFavourites';
import { useFavouriteStore } from '../store/useFavouriteStore';
import { Character } from '../utils/types';

jest.mock('../store/useFavouriteStore');

describe('useFavourites hook', () => {
  const character: Character = {
    name: 'Luke Skywalker',
    height: '172',
    gender: 'male',
    hair_color: '',
    eye_color: '',
    homeworld: '',
    films: [],
    starships: [],
    url: '',
  };
  let setFavouritesMock: jest.Mock;

  beforeEach(() => {
    setFavouritesMock = jest.fn();
    (useFavouriteStore as jest.Mock).mockReturnValue({
      favourites: [] as Character[],
      setFavourites: setFavouritesMock,
    });
    localStorage.clear();
  });

  test('adds a character to favourites', () => {
    const { result } = renderHook(() => useFavourites());

    act(() => {
      result.current.addFavourite(character);
    });

    expect(setFavouritesMock).toHaveBeenCalledWith([character]);
    expect(localStorage.getItem('favourites')).toBe(
      JSON.stringify([character]),
    );
  });

  test('updates an existing favourite character', () => {
    const updatedCharacter = { ...character, height: '175', gender: 'female' };
    (useFavouriteStore as jest.Mock).mockReturnValue({
      favourites: [character, { ...character, name: 'Boba frett' }],
      setFavourites: setFavouritesMock,
    });
    const { result } = renderHook(() => useFavourites());

    act(() => {
      result.current.updateFavourite(updatedCharacter);
    });

    expect(setFavouritesMock).toHaveBeenCalledWith([
      updatedCharacter,
      { ...character, name: 'Boba frett' },
    ]);
    expect(localStorage.getItem('favourites')).toBe(
      JSON.stringify([updatedCharacter, { ...character, name: 'Boba frett' }]),
    );
  });

  test('removes a character from favourites', () => {
    (useFavouriteStore as jest.Mock).mockReturnValue({
      favourites: [character],
      setFavourites: setFavouritesMock,
    });
    const { result } = renderHook(() => useFavourites());

    act(() => {
      result.current.removeFavourite(character.name);
    });

    expect(setFavouritesMock).toHaveBeenCalledWith([]);
    expect(localStorage.getItem('favourites')).toBe(JSON.stringify([]));
  });
});
