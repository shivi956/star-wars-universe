import { useQueries } from 'react-query';
import { fetchFilm } from '../api/swapi';

export const useFilms = (films: string[]) => {

    const filmQueries = useQueries(
        (films).map((film) => ({
            queryKey: ['film', film],
            queryFn: () => fetchFilm(film),
            enabled: !!film, // Only run if characters data is available
        })),
    );
    const isLoading = filmQueries.some(query => query.isLoading);
    const isError = filmQueries.some(query => query.error);
    const filmData = filmQueries.map(result => result.data ?? '').filter(Boolean);

    return { data: filmData, isLoading, isError };
};
