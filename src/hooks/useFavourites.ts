import { Character } from '../utils/types';
import { useFavouriteStore } from '../store/useFavouriteStore';

export const useFavourites = () => {
    const { favourites, setFavourites } = useFavouriteStore();

    const addFavourite = (character: Character) => {
        const updatedFavourites = [...favourites, character];
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    const updateFavourite = (character: Character) => {
        const updatedFavourites = favourites.map((favChar) => {
            if (favChar.name === character.name) {
                return { ...favChar, height: character.height, gender: character.gender };
            }

            return favChar;
        })
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));

        return updatedFavourites;
        ;
    };

    const removeFavourite = (name: string) => {
        const updatedFavourites = favourites.filter((char) => char.name !== name);
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    };

    return { addFavourite, removeFavourite, updateFavourite };
};
