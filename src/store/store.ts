import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slice/characterSlice';
import favouriteReducer from './slice/favouriteSlice';

export const store = configureStore({
	reducer: {
		characters: characterReducer,
		favourites: favouriteReducer
	},
});

