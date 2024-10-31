import { useDispatch, useSelector } from 'react-redux';
import { Character } from '../utils/types';
import { setCharacter, setCharacters } from './slice/characterSlice';
import { useCallback } from 'react';

interface CharacterState {
    characters: { [key: string]: Character };
}

export const useCharacterStore = () => {
    const characters = useSelector((state: CharacterState) => state.characters);
    const dispatch = useDispatch();

    const memoizedSetCharacters = useCallback(
        (characters: Character[]) => dispatch(setCharacters(characters)),
        [dispatch]
    );

    const memoizedSetCharacter = useCallback(
        (character: Character) => dispatch(setCharacter(character)),
        [dispatch]
    );

    return {
        characters,
        setCharacters: memoizedSetCharacters,
        setCharacter: memoizedSetCharacter
    };
};