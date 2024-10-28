import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCharacterDetails } from '../api/swapi';
import { useFavourites } from '../hooks/useFavourites';
import CharacterDetailsCard from '../components/CharacterDetailsCard';
import { Loading } from '../components/Loading';

const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { favourites, addFavourite } = useFavourites();

  const { data, isLoading } = useQuery(['character-people', id], () =>
    fetchCharacterDetails(id ?? ''),
  );

  if (isLoading)
    return (
      <div className="text-center">
        <Loading />
      </div>
    );

  const isFavourite = favourites.some((fav) => fav.url === data.url);

  return (
    <CharacterDetailsCard
      name={data.name}
      hairColor={data.hair_color}
      eyeColor={data.eye_color}
      gender={data.gender}
      homeworld={data.homeworld}
      filmNames={data.films}
      starshipNames={data.starships}
      isFavourite={isFavourite}
      onAddFavourite={() => addFavourite(data)}
    />
  );
};

export default CharacterDetails;
