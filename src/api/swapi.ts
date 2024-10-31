import axios from 'axios';
import { Character, CharacterListResponse } from '../utils/types';

const SWAPI_BASE_URL = 'https://swapi.dev/api';


export const fetchCharacters = async (page: number, search: string): Promise<CharacterListResponse> => {
    const response = await axios.get(`${SWAPI_BASE_URL}/people/`, {
        params: { page, search },
    });

    return { count: response.data.count, characters: response.data.results };
};

export const fetchCharacterDetails = async (id: string): Promise<Character> => {
    const response = await axios.get(`${SWAPI_BASE_URL}/people/${id}`);

    return response.data;
};


export const fetchHomeworld = async (url: string): Promise<string> => {
    const response = await axios.get(url);

    return response.data.name;
}

export const fetchFilm = async (url: string): Promise<string> => {
    const response = await axios.get(url);

    return response.data.title;
}

export const fetchStarship = async (url: string): Promise<string> => {
    const response = await axios.get(url);

    return response.data.name;
}