import axios from 'axios';
jest.unmock('../api/swapi');
import { fetchCharacters, fetchCharacterDetails, fetchHomeworld, fetchFilm, fetchStarship } from '../api/swapi'; // Adjust the import path as necessary
import { Character, CharacterListResponse } from '../utils/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('API Utility Functions', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchCharacters', () => {
        it('fetches characters successfully', async () => {
            const mockResponse: CharacterListResponse = {
                count: 10,
                characters: [
                    { name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' } as Character,
                    { name: 'Darth Vader', url: 'https://swapi.dev/api/people/4/' } as Character,
                ],
            };
            mockedAxios.get.mockResolvedValueOnce({ data: { count: 10, results: mockResponse.characters } });

            const result = await fetchCharacters(1, '');

            expect(result).toEqual(mockResponse);
            expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/people/', {
                params: { page: 1, search: '' },
            });
        });

        it('handles errors during fetching characters', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

            await expect(fetchCharacters(1, '')).rejects.toThrow('Network error');
        });
    });

    describe('fetchCharacterDetails', () => {
        it('fetches character details successfully', async () => {
            const mockCharacter: Character = {
                name: 'Luke Skywalker',
                url: 'https://swapi.dev/api/people/1/',
            } as Character;
            mockedAxios.get.mockResolvedValueOnce({ data: mockCharacter });

            const result = await fetchCharacterDetails('1');

            expect(result).toEqual(mockCharacter);
            expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/people/1');
        });

        it('handles errors during fetching character details', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

            await expect(fetchCharacterDetails('1')).rejects.toThrow('Network error');
        });
    });

    describe('fetchHomeworld', () => {
        it('fetches homeworld name successfully', async () => {
            const mockHomeworld = { name: 'Tatooine' };
            mockedAxios.get.mockResolvedValueOnce({ data: mockHomeworld });

            const result = await fetchHomeworld('https://swapi.dev/api/planets/1/');

            expect(result).toEqual(mockHomeworld.name);
            expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/planets/1/');
        });

        it('handles errors during fetching homeworld', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

            await expect(fetchHomeworld('https://swapi.dev/api/planets/1/')).rejects.toThrow('Network error');
        });
    });

    describe('fetchFilm', () => {
        it('fetches film title successfully', async () => {
            const mockFilm = { title: 'A New Hope' };
            mockedAxios.get.mockResolvedValueOnce({ data: mockFilm });

            const result = await fetchFilm('https://swapi.dev/api/films/1/');

            expect(result).toEqual(mockFilm.title);
            expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/films/1/');
        });

        it('handles errors during fetching film', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

            await expect(fetchFilm('https://swapi.dev/api/films/1/')).rejects.toThrow('Network error');
        });
    });

    describe('fetchStarship', () => {
        it('fetches starship name successfully', async () => {
            const mockStarship = { name: 'X-wing' };
            mockedAxios.get.mockResolvedValueOnce({ data: mockStarship });

            const result = await fetchStarship('https://swapi.dev/api/starships/1/');

            expect(result).toEqual(mockStarship.name);
            expect(mockedAxios.get).toHaveBeenCalledWith('https://swapi.dev/api/starships/1/');
        });

        it('handles errors during fetching starship', async () => {
            mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

            await expect(fetchStarship('https://swapi.dev/api/starships/1/')).rejects.toThrow('Network error');
        });
    });
});
