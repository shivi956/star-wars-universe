import CharacterCardList from '../components/CharacterCardList';
import { useFavourites } from '../hooks/useFavourites';

const Favourites = () => {
  const { favourites, removeFavourite } = useFavourites();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold text-center text-white">Favourites</h2>
      <CharacterCardList characters={favourites} remove={removeFavourite} />
    </div>
  );
};

export default Favourites;
