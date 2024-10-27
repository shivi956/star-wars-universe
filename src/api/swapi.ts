// src/api/swapi.ts
import axios from 'axios';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

export const fetchCharacters = async (page: number, search: string) => {
    const response = await axios.get(`${SWAPI_BASE_URL}/people/`, {
        params: { page, search },
    });
    return response.data;
};

export const fetchCharacterDetails = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
};
