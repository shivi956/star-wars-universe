import { useQuery } from 'react-query';
import { fetchHomeworld } from '../api/swapi';

export const useHomeworld = (homeworld: string) => {

    const { data, isLoading, error } = useQuery(
        ['homeworld', homeworld],
        () => fetchHomeworld(homeworld),
        {
            enabled: !!homeworld, // Enable only if homeworld is defined
        }
    );

    return {
        data: data ?? '',
        isLoading,
        isError: !!error,
    };
};
