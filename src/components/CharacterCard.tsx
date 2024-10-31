import React, { useEffect, useRef } from 'react';

type CharacterCardProps = {
  name: string;
  gender: string;
  homeworld: string;
  height?: string;
  removeCard?: (name: string) => void;
  editCard?: () => void;
  cardClick?: () => void;
};

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  gender,
  homeworld,
  height,
  removeCard,
  editCard,
  cardClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (cardElement && cardClick) {
      cardRef.current.tabIndex = 0;
      cardRef.current.addEventListener('click', cardClick);
    }

    return () => {
      if (cardElement && cardClick) {
        cardElement.addEventListener('click', cardClick);
      }
    };
  }, [cardClick]);

  return (
    <div
      ref={cardRef}
      data-testid={'character-card'}
      className={`p-4 bg-slate-400/85 hover:bg-slate-400/95 hover: rounded shadow-2xl text-left transition duration-75 ease-in-out transform hover:scale-105 ${cardClick ? 'cursor-pointer' : 'cursor-default'}`}
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
    </div>
  );
};

export default CharacterCard;
