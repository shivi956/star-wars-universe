import { useMemo } from 'react';
import { Character } from '../utils/types';
import { useQueries } from 'react-query';
import { fetchHomeworld } from '../api/swapi';

export const usePlanets = (characters: Character[]) => {

    const homeworldQueries = useQueries(
        characters.map((character) => ({
            queryKey: ['homeworld', character.homeworld],
            queryFn: () => fetchHomeworld(character.homeworld),
            enabled: !!character.homeworld,
        }))
    );
    const isLoading = homeworldQueries.some(query => query.isLoading);
    const isError = homeworldQueries.some(query => !!query.error);


    const homeworldNames = useMemo(() => {
        return homeworldQueries.reduce(
            (acc, result, idx) => {
                const characterName = characters[idx]?.name;
                if (characterName && result.data) {
                    acc[characterName] = result.data;
                }

                return acc;
            },
            {} as { [key: string]: string },
        );
    }, [homeworldQueries, characters]);

    return {
        data: homeworldNames,
        isLoading,
        isError,
    };
};
