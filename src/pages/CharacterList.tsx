import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fetchCharacters } from '../api/swapi';
import PaginationBar from '../components/PaginationBar';
import { Loading } from '../components/Loading';
import { debounce } from 'lodash';
import { Character } from '../utils/types';
import CharacterCard from '../components/CharacterCard';
import { useNavigate } from 'react-router-dom';
import { useCharacterStore } from '../store/useCharacterStore';
import { usePlanets } from '../hooks/usePlanets';
import { getUrlKey } from '../utils/helper';

const CharacterList = () => {
  const navigate = useNavigate();
  const { setCharacters } = useCharacterStore();
  const [page, setPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');

  const { data, isLoading, error, isRefetching, isRefetchError } = useQuery(
    ['characters', search ? `${search}-${searchPage}` : page],
    () => fetchCharacters(searchTerm ? searchPage : page, search),
    {
      keepPreviousData: true,
    },
  );

  const {
    data: homeworldNames,
    isLoading: isPlanetLoading,
    isError: isPlanetError,
  } = usePlanets(data?.characters ?? []);

  useEffect(() => {
    const debouncedSearch = debounce((term: string) => {
      setSearch(term);
    }, 300);

    debouncedSearch(searchTerm);

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  useEffect(() => {
    if (data?.characters) {
      setCharacters(data?.characters);
    }
  }, [setCharacters, data?.characters, search]);

  const isLoadingAny = isLoading || isRefetching || isPlanetLoading;

  const isErrorAny = error || isRefetchError || isPlanetError;

  return (
    <div className="container mx-auto p-4">
      <input
        type="search"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded opacity-75"
      />

      {isLoadingAny && (
        <div className="text-slate-100">
          <Loading />
        </div>
      )}
      {isErrorAny && <div>Error loading characters</div>}
      {!isLoadingAny && !isErrorAny && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.characters?.map((character: Character) => (
              <CharacterCard
                key={character.name}
                name={character.name}
                gender={character.gender}
                homeworld={homeworldNames[character.name]}
                cardClick={() => {
                  navigate(`/character/${getUrlKey(character.url)}`);
                }}
              />
            ))}
          </div>
          <PaginationBar
            currentPage={searchTerm ? searchPage : page}
            totalPages={Math.ceil((data?.count ?? 0) / 10)}
            onPageChange={(pageNumber) => {
              if (searchTerm) {
                setSearchPage(pageNumber);
              } else {
                setPage(pageNumber);
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default CharacterList;
