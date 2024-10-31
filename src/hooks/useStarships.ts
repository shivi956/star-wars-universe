import { useQueries } from 'react-query';
import { fetchStarship } from '../api/swapi';

export const useStarships = (starships: string[]) => {

    const starshipQueries = useQueries(
        (starships).map((starship) => ({
            queryKey: ['starship', starship],
            queryFn: () => fetchStarship(starship),
            enabled: !!starship, // Only run if characters data is available
        })),
    );

    const isLoading = starshipQueries.some(query => query.isLoading);
    const isError = starshipQueries.some(query => !!query.error);
    const starshipData = starshipQueries.map(result => result.data ?? '').filter(Boolean);

    return { data: starshipData, isLoading, isError };
};
