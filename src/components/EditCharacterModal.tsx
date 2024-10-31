import React, { useState } from 'react';
import Modal from './Modal';
import { Character } from '../utils/types';
import { useFavourites } from '../hooks/useFavourites';

interface EditCharacterModalProps {
  character: Character;
  onClose: () => void;
}

const EditCharacterModal: React.FC<EditCharacterModalProps> = ({
  character,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [updatedCharacter, setUpdatedCharacter] = useState(character);
  const { updateFavourite } = useFavourites();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'height') {
      setUpdatedCharacter({
        ...updatedCharacter,
        height: event.target.value,
      });
    } else {
      setUpdatedCharacter({
        ...updatedCharacter,
        gender: event.target.id,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        onClose();
      }}
      onSave={() => updateFavourite(updatedCharacter)}
      title={`Editing: ${character.name}`}
    >
      <div className="p-4">
        <div className="mb-4">
          <label
            htmlFor="height"
            className="block text-gray-700 font-medium mb-2"
          >
            Height:
          </label>
          <input
            id="height"
            type="number"
            value={updatedCharacter.height}
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>

        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">Gender</p>
          <div className="flex items-center space-x-4">
            <div>
              <input
                id="male"
                type="radio"
                checked={updatedCharacter.gender === 'male'}
                onChange={onChange}
                className="mr-1"
              />
              <label htmlFor="male" className="text-gray-600">
                Male
              </label>
            </div>
            <div>
              <input
                id="female"
                type="radio"
                checked={updatedCharacter.gender === 'female'}
                onChange={onChange}
                className="mr-1"
              />
              <label htmlFor="female" className="text-gray-600">
                Female
              </label>
            </div>
            <div>
              <input
                id="n/a"
                type="radio"
                checked={updatedCharacter.gender === 'n/a'}
                onChange={onChange}
                className="mr-1"
              />
              <label htmlFor="n/a" className="text-gray-600">
                N/A
              </label>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditCharacterModal;
