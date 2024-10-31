import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Character } from '../../utils/types';
import { getUrlKey } from '../../utils/helper';

const characterSlice = createSlice({
    name: 'characters',
    initialState: {} as { [key: string]: Character },
    reducers: {
        setCharacters: (state, action: PayloadAction<Character[]>) => {
            action.payload.forEach(character => {
                const key = getUrlKey(character.url);
                if (key) {state[key] = character;}
            });
        },
        setCharacter: (state, action: PayloadAction<Character>) => {
            const key = getUrlKey(action.payload.url);
            if (key) {state[key] = action.payload;}
        }
    },
});

export const { setCharacters, setCharacter } = characterSlice.actions;
export default characterSlice.reducer;
