import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCharacters, fetchCharactersBySearch } from '../api/swapi';
import Pagination from '../components/Pagination';
import { Loading } from '../components/Loading';
import { debounce } from 'lodash';
import CharacterCardList from '../components/CharacterCardList';

const CharacterList = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');

  const { data, isLoading, error, isRefetching, isRefetchError } = useQuery(
    [`characters-${search ? 'search' : 'page'}`, search || page],
    () => (search ? fetchCharactersBySearch(search) : fetchCharacters(page)),
    {
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    const debouncedSearch = debounce((term: string) => {
      setSearch(term);
    }, 300);

    debouncedSearch(searchTerm);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  if (isLoading || isRefetching)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error || isRefetchError) return <div>Error loading characters</div>;

  const characters = data.results;

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded opacity-75"
      />
      <CharacterCardList characters={characters} />
      <Pagination
        currentPage={page}
        setPage={(pageNumber) => {
          setPage(pageNumber);
          setSearchTerm('');
        }}
      />
    </div>
  );
};

export default CharacterList;
