import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCharacterDetails } from '../api/swapi';
import { useFavourites } from '../hooks/useFavourites';
import CharacterDetailsCard from '../components/CharacterDetailsCard';
import { Loading } from '../components/Loading';
import { useCharacterStore } from '../store/useCharacterStore';
import { useEffect } from 'react';
import { useFilms } from '../hooks/useFilms';
import { useStarships } from '../hooks/useStarships';
import { useHomeworld } from '../hooks/useHomeworld';
import { useFavouriteStore } from '../store/useFavouriteStore';

const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { addFavourite } = useFavourites();
  const { characters, setCharacter } = useCharacterStore();
  const { favourites } = useFavouriteStore();

  const { data: character, isLoading } = useQuery(
    ['character-people', id],
    () => fetchCharacterDetails(id ?? ''),
    {
      enabled: !!id && !characters[id],
      initialData: id && characters[id] ? characters[id] : undefined,
    },
  );

  const filmData = useFilms(character?.films ?? []);
  const starshipData = useStarships(character?.starships ?? []);
  const homeworldData = useHomeworld(character?.homeworld ?? '');

  const isLoadingAny =
    isLoading ||
    filmData.isLoading ||
    starshipData.isLoading ||
    homeworldData.isLoading;

  useEffect(() => {
    if (character) {
      setCharacter(character);
    }
  }, [setCharacter, character]);

  if (isLoadingAny)
    {return (
      <div className="text-center text-slate-100">
        <Loading />
      </div>
    );}

  const isFavourite = favourites.some((fav) => fav.name === character?.name);

  return (
    character && (
      <CharacterDetailsCard
        name={character.name}
        hairColor={character.hair_color}
        eyeColor={character.eye_color}
        gender={character.gender}
        homeworld={
          homeworldData.isError ? 'Error Loading Homeworld' : homeworldData.data
        }
        filmNames={filmData.isError ? ['Error Loading Films'] : filmData.data}
        starshipNames={
          starshipData.isError ? ['Error Loading Starships'] : starshipData.data
        }
        isFavourite={isFavourite}
        onAddFavourite={() =>
          addFavourite({ ...character, homeworld: homeworldData.data })
        }
      />
    )
  );
};

export default CharacterDetails;
