import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Character } from '../../utils/types';

const favouriteSlice = createSlice({
    name: 'favourites',
    initialState: [] as Character[],
    reducers: {
        setFavourites: (_state, action: PayloadAction<Character[]>) => {
            return action.payload;
        }
    },
});

export const { setFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;
