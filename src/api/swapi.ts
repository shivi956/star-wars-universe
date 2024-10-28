import axios from 'axios';
import { Character } from '../utils/types';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

const fetchCharactersWithHomeworld = async (characters: Character[]) => {
    return await Promise.all(
        characters.map(async (character: Character) => {
            const homeworldResponse = await axios.get(character.homeworld);
            return {
                ...character,
                homeworld: homeworldResponse.data.name,
            };
        })
    );
};


export const fetchCharacters = async (page: number) => {
    const response = await axios.get(`${SWAPI_BASE_URL}/people/`, {
        params: { page },
    });

    const charactersWithHomeworld = await fetchCharactersWithHomeworld(response.data.results);
    return {
        ...response.data,
        results: charactersWithHomeworld,
    };
};

export const fetchCharactersBySearch = async (search: string) => {
    const response = await axios.get(`${SWAPI_BASE_URL}/people/`, {
        params: { search },
    });

    const charactersWithHomeworld = await fetchCharactersWithHomeworld(response.data.results);
    return {
        ...response.data,
        results: charactersWithHomeworld,
    };
};

export const fetchCharacterDetails = async (id: string) => {
    const response = await axios.get(`${SWAPI_BASE_URL}/people/${id}`);
    const character = response.data;

    const promises = [
        axios.get(character.homeworld),
        ...character.films.map((filmUrl: string) => axios.get(filmUrl)),
        ...character.starships.map((starshipUrl: string) => axios.get(starshipUrl)),
    ];


    const [homeworldResponse, ...filmAndStarshipResponses] = await Promise.all(promises);

    const homeworld = homeworldResponse.data.name;

    const filmNames: string[] = [];
    const starshipNames: string[] = [];

    filmAndStarshipResponses.forEach((response, index) => {
        if (index < character.films.length) {
            filmNames.push(response.data.title);
        } else {
            starshipNames.push(response.data.name);
        }
    });

    return {
        ...character,
        homeworld,
        films: filmNames,
        starships: starshipNames,
    };
};