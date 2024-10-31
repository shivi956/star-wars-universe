type CharacterDetailsCardProps = {
  name: string;
  hairColor: string;
  eyeColor: string;
  gender: string;
  homeworld: string;
  filmNames: string[];
  starshipNames: string[];
  isFavourite: boolean;
  onAddFavourite: () => void;
};

const CharacterDetailsCard: React.FC<CharacterDetailsCardProps> = ({
  name,
  hairColor,
  eyeColor,
  gender,
  homeworld,
  filmNames,
  starshipNames,
  isFavourite,
  onAddFavourite,
}) => (
  <div
    data-testid={'characterDetailsCard'}
    className="container mx-auto mt-10 p-4 text-center bg-slate-400/95 rounded shadow-2xl w-96"
  >
    <h1 className="text-3xl font-bold mb-4">{name}</h1>
    <div className="mb-4">
      <p className="text-lg">
        Hair Color: <span className="font-semibold">{hairColor}</span>
      </p>
      <p className="text-lg">
        Eye Color: <span className="font-semibold">{eyeColor}</span>
      </p>
      <p className="text-lg">
        Gender: <span className="font-semibold">{gender}</span>
      </p>
      <p className="text-lg">
        Homeworld: <span className="font-semibold">{homeworld}</span>
      </p>
    </div>

    <h2 className="text-2xl font-semibold mt-6">Films</h2>
    <ul className="mb-4">
      {filmNames.map((film) => (
        <li key={film} className="text-lg">
          {film}
        </li>
      ))}
    </ul>

    <h2 className="text-2xl font-semibold">Starships</h2>
    <ul className="mb-4">
      {starshipNames.length
        ? starshipNames.map((starship) => (
            <li key={starship} className="text-lg">
              {starship}
            </li>
          ))
        : 'N/A'}
    </ul>

    <button
      onClick={onAddFavourite}
      disabled={isFavourite}
      className={`px-4 py-2 font-semibold text-white transition-colors duration-300 rounded ${
        isFavourite
          ? 'bg-green-600 hover:bg-green-700 cursor-default'
          : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
      } ${isFavourite ? 'opacity-70' : 'opacity-100'}`}
    >
      {isFavourite ? 'Added to Favourites' : 'Add to Favourites'}
    </button>
  </div>
);

export default CharacterDetailsCard;
