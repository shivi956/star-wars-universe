import { Character } from '../utils/types';
import CharacterCard from './CharacterCard';

type CharacterCardListProps = {
  characters: Character[];
  remove?: (url: string) => void;
};

const CharacterCardList: React.FC<CharacterCardListProps> = ({
  characters,
  remove,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {characters.map((character: Character) => (
      <CharacterCard
        key={character.name}
        name={character.name}
        gender={character.gender}
        homeworld={character.homeworld}
        url={character.url}
        remove={remove}
      />
    ))}
  </div>
);

export default CharacterCardList;
