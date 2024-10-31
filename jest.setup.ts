import "@testing-library/jest-dom";


jest.mock('./src/api/swapi', () => ({
    fetchCharacters: jest.fn(),
    fetchCharacterDetails: jest.fn(),
    fetchHomeworld: jest.fn(),
    fetchFilm: jest.fn(),
    fetchStarship: jest.fn(),


}));


import { fetchCharacterDetails, fetchCharacters, fetchFilm, fetchHomeworld, fetchStarship } from './src/api/swapi';
import { Character, CharacterListResponse } from "./src/utils/types";

const mockFetchCharacters = fetchCharacters as jest.Mock<Promise<CharacterListResponse>>;
mockFetchCharacters.mockResolvedValue({
    characters: [
        {
            name: 'Luke Skywalker', gender: 'male', url: '/1/',
            hair_color: "",
            eye_color: "",
            homeworld: "planets/1/",
            films: ["/film/1", "/film/2", "/film/3"],
            starships: ["/starship/1", "/starship/2", "/starship/3"],
            height: ""
        },
        {
            name: 'Leia Organa', gender: 'female', url: '/2/',
            hair_color: "",
            eye_color: "",
            homeworld: "planets/1/",
            films: ["/film/2", "/film/3"],
            starships: ["/starship/1", "/starship/2"],
            height: ""
        },
    ],
    count: 20,
});

const mockFetchCharactersDetails = fetchCharacterDetails as jest.Mock<Promise<Character>>;
mockFetchCharactersDetails.mockImplementation((id: string) => {
    if (id === '1') {
        return Promise.resolve({
            name: 'Luke Skywalker', gender: 'male', url: '/1/',
            hair_color: "brown",
            eye_color: "blue",
            homeworld: "planets/1/",
            height: "",
            films: [],
            starships: []
        })
    } else if (id === '2') {
        return Promise.resolve({
            name: 'Leia Organa', gender: 'female', url: '/2',
            hair_color: "black",
            eye_color: "black",
            homeworld: "planets/2/",
            height: "",
            films: ["/film/5"],
            starships: ["/starship/5"]
        })
    } else {
        return Promise.reject({
            status: 500,
            data: {
                message: 'Internal Server Error'
            }
        })
    }
}
);


const mockFetchHomeworld = fetchHomeworld as jest.Mock<Promise<string>>;
mockFetchHomeworld.mockImplementation((url: string) => {
    if (url === 'planets/1/') {
        return Promise.resolve("Tatooine")
    }
    else {
        return Promise.reject({
            status: 500,
            data: {
                message: 'Internal Server Error'
            }
        })
    }
});

const mockFetchFilm = fetchFilm as jest.Mock<Promise<string>>;
mockFetchFilm.mockImplementation((url: string) => {
    if (url === '/film/1') {
        return Promise.resolve("A New Hope")
    }
    else if (url === '/film/2') {
        return Promise.resolve("The Empire Strikes Back")
    }
    else {
        return Promise.reject({
            status: 500,
            data: {
                message: 'Internal Server Error'
            }
        })
    }
});

const mockFetchStarship = fetchStarship as jest.Mock<Promise<string>>;
mockFetchStarship.mockImplementation((url: string) => {
    if (url === '/starship/1') {
        return Promise.resolve("CR90 corvette")
    }
    else if (url === '/starship/2') {
        return Promise.resolve("Death Star")
    }
    else {
        return Promise.reject({
            status: 500,
            data: {
                message: 'Internal Server Error'
            }
        })
    }
});
