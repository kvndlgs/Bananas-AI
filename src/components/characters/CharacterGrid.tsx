import React from 'react';
import { Character } from '../../data/characters';
import CharacterCard from './CharacterCard';

interface CharacterGridProps {
  characters: Character[];
  selectedHost?: Character;
  selectedGuest?: Character;
  onSelectHost: (character: Character) => void;
  onSelectGuest: (character: Character) => void;
}

const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters,
  selectedHost,
  selectedGuest,
  onSelectHost,
  onSelectGuest,
}) => {
  return (
    <div className="w-full">
      <div className="mb-8">
<<<<<<< HEAD
        <h2 className="text-2xl font-display font-bold text-neutral-800 mb-2">Select Host</h2>
        <p className="text-neutral-600 mb-4">Choose a character to host the podcast</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
=======
        <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">Select Host</h2>
        <p className="text-gray-600 mb-4">Choose a character to host the podcast</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
          {characters.map((character) => (
            <CharacterCard
              key={`host-${character.id}`}
              character={character}
              isSelected={selectedHost?.id === character.id}
              onClick={() => onSelectHost(character)}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
<<<<<<< HEAD
        <h2 className="text-2xl font-display font-bold text-neutral-800 mb-2">Select Guest</h2>
        <p className="text-neutral-600 mb-4">Choose a character to be interviewed</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
=======
        <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">Select Guest</h2>
        <p className="text-gray-600 mb-4">Choose a character to be interviewed</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
          {characters.map((character) => (
            <CharacterCard
              key={`guest-${character.id}`}
              character={character}
              isSelected={selectedGuest?.id === character.id}
              onClick={() => onSelectGuest(character)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterGrid;