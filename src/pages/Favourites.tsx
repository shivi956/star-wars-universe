import { useState } from 'react';
import CharacterCard from '../components/CharacterCard';
import { useFavourites } from '../hooks/useFavourites';
import { Character } from '../utils/types';
import { createPortal } from 'react-dom';
import { useFavouriteStore } from '../store/useFavouriteStore';
import EditCharacterModal from '../components/EditCharacterModal';

const Favourites = () => {
  const { removeFavourite } = useFavourites();
  const { favourites } = useFavouriteStore();
  const [editCharacter, setEditCharacter] = useState<Character | null>(null); // Store the character to be edited

  const closeEditCharacter = () => {
    setEditCharacter(null); // Reset to close the modal
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl font-bold text-center text-white p-4">
        Favourites
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favourites.map((character: Character) => (
          <CharacterCard
            key={character.name}
            name={character.name}
            gender={character.gender}
            height={character.height}
            homeworld={character.homeworld}
            editCard={() => {
              setEditCharacter(character);
            }}
            removeCard={removeFavourite}
          />
        ))}
      </div>
      {editCharacter && //create portal is used to show the modal
        createPortal(
          <EditCharacterModal
            character={editCharacter}
            onClose={closeEditCharacter}
          />,
          document.body,
        )}
    </div>
  );
};

export default Favourites;
