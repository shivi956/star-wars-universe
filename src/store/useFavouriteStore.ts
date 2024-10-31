import { useDispatch, useSelector } from 'react-redux';
import { setFavourites } from './slice/favouriteSlice';
import { Character } from '../utils/types';
import { useCallback } from 'react';

interface FavouritesState {
    favourites: Character[];
}

export const useFavouriteStore = () => {
    const favourites = useSelector((state: FavouritesState) => state.favourites);
    const dispatch = useDispatch();

    const memoizedSetFavourites = useCallback(
        (characters: Character[]) => dispatch(setFavourites(characters)),
        [dispatch]
    );

    return {
        favourites,
        setFavourites: memoizedSetFavourites,
    };
};
