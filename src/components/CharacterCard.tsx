import Card from './Card';

interface CharacterCardProps {
  name: string;
  gender: string;
  homeworld: string;
  height?: string;
  removeCard?: (name: string) => void;
  editCard?: () => void;
  cardClick?: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  gender,
  homeworld,
  height,
  removeCard,
  editCard,
  cardClick,
}) => {
  return (
    <Card
      className="p-4 bg-slate-400/95 hover:bg-slate-400/85 rounded shadow-2xl transition duration-75 ease-in-out transform hover:scale-105 cursor-pointer"
      onClick={cardClick}
      dataTestId={'character-card'}
    >
      <h2 className="text-xl font-bold">{name}</h2>
      <p>
        Gender: <span className="font-semibold">{gender}</span>
      </p>
      <p>
        Homeworld: <span className="font-semibold">{homeworld}</span>
      </p>
      {height && (
        <p>
          Height: <span className="font-semibold">{height}</span>
        </p>
      )}
      <div className="float-right">
        {editCard && (
          <button
            data-testid="editCard"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              editCard();
            }}
            className="px-4 py-2 mr-4 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Edit
          </button>
        )}
        {removeCard && (
          <button
            data-testid="removeCard"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              removeCard(name);
            }}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white  rounded"
          >
            Remove
          </button>
        )}
      </div>
    </Card>
  );
};

export default CharacterCard;
