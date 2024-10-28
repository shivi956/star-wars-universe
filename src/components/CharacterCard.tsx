import { useNavigate } from 'react-router-dom';

type CharacterCardProps = {
  name: string;
  gender: string;
  homeworld: string;
  url: string;
  remove?: (url: string) => void;
};

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  gender,
  homeworld,
  url,
  remove,
}) => {
  const navigate = useNavigate();
  const onCardClick = () => {
    navigate(`/character/${url.slice(-2)}`);
  };
  return (
    <div
      tabIndex={0}
      role="button"
      aria-pressed="false"
      onClick={() => onCardClick()}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          onCardClick();
        }
      }}
      className="p-4 bg-slate-400/85 hover:bg-slate-400/95 hover: rounded shadow-2xl text-left transition duration-75 ease-in-out transform hover:scale-105"
    >
      <h2 className="text-xl font-bold">{name}</h2>
      <p>Gender: {gender}</p>
      <p>Homeworld: {homeworld}</p>
      {remove && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            remove(url);
          }}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md float-right"
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default CharacterCard;
