import React from 'react';
import { Character } from '../../data/characters';

interface CharacterCardProps {
  character: Character;
  isSelected?: boolean;
  onClick?: () => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ 
  character, 
  isSelected = false,
  onClick 
}) => {
  return (
    <div 
      className={`
        relative overflow-hidden shadow-xl rounded-xl transition-all duration-300 transform bg-banana-200
        ${isSelected 
          ? 'ring-4 ring-secondary-300 scale-102 shadow-lg' 
          : 'hover:scale-101 hover:shadow-lg'
        }
        cursor-pointer
      `}
      onClick={onClick}
    >
      <div className="p-6 text-banana-700">
        <div className="flex items-start mb-4">
          <div 
            className="w-20 h-20 rounded-full overflow-hidden border-4 flex-shrink-0 border-2 border-banana-400"
          >
            <img 
              src={character.avatarUrl} 
              alt={character.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h3 
              className="font-display font-bold text-xl mb-1 text-banana-800"
            >
              {character.name}
            </h3>
            <p className="text-sm font-medium text-banana-700 opacity-90">{character.title}</p>
          </div>
        </div>

        <div className="mb-4">
          <p 
            className="text-sm leading-relaxed opacity-90 mb-3 text-banana-700"
          >
            {character.description}
          </p>
        </div>

        <div className="mb-4">
          <h4 
            className="text-xs font-semibold uppercase tracking-wider mb-2"
            style={{ color: character.textColor }}
          >
            Personality Traits
          </h4>
          <div className="flex flex-wrap gap-2">
            {character.personality.map((trait, index) => (
              <div 
                key={index}
                className="text-xs px-2 py-1 rounded-full font-medium text-white bg-banana-700"

                title={trait.description}
              >
                {trait.trait}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <blockquote 
            className="italic text-sm p-3 rounded-lg bg-banana-600 text-banana-100 border-l-4 border-banana-800"
          >
            "{character.sampleQuote}"
          </blockquote>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute top-3 right-3 bg-secondary-300 text-white text-xs font-regular px-2 py-1 rounded-full shadow-md">
          Selected
        </div>
      )}
    </div>
  );
};

export default CharacterCard;