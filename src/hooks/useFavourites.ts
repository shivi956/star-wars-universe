import { useState, useEffect } from 'react';
import { Character } from '../utils/types';

export const useFavourites = () => {
    const [favourites, setFavourites] = useState<Character[]>([]);

    useEffect(() => {
        const storedFavourites = JSON.parse(localStorage.getItem('favourites') ?? '[]');
        setFavourites(storedFavourites);
    }, []);

    const addFavourite = (character: Character) => {
        const updatedFavourites = [...favourites, character];
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    const removeFavourite = (characterUrl: string) => {
        const updatedFavourites = favourites.filter((char) => char.url !== characterUrl);
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    return { favourites, addFavourite, removeFavourite };
};
