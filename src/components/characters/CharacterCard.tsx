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
<<<<<<< HEAD
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
=======
        relative overflow-hidden rounded-xl transition-all duration-300 transform
        ${isSelected 
          ? 'ring-4 ring-primary scale-105 shadow-lg' 
          : 'hover:scale-102 shadow-md hover:shadow-lg'
        }
        cursor-pointer
      `}
      style={{ 
        backgroundColor: character.backgroundColor,
      }}
      onClick={onClick}
    >
      <div className="p-6 text-white">
        <div className="flex items-start mb-4">
          <div 
            className="w-20 h-20 rounded-full overflow-hidden border-4 flex-shrink-0"
            style={{ borderColor: character.textColor }}
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
          >
            <img 
              src={character.avatarUrl} 
              alt={character.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h3 
<<<<<<< HEAD
              className="font-display font-bold text-xl mb-1 text-banana-800"
            >
              {character.name}
            </h3>
            <p className="text-sm font-medium text-banana-700 opacity-90">{character.title}</p>
=======
              className="font-display font-bold text-xl mb-1"
              style={{ color: character.textColor }}
            >
              {character.name}
            </h3>
            <p className="text-sm font-medium opacity-90">{character.title}</p>
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
          </div>
        </div>

        <div className="mb-4">
          <p 
<<<<<<< HEAD
            className="text-sm leading-relaxed opacity-90 mb-3 text-banana-700"
=======
            className="text-sm leading-relaxed opacity-90 mb-3"
            style={{ color: 'rgba(255,255,255,0.9)' }}
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
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
<<<<<<< HEAD
                className="text-xs px-2 py-1 rounded-full font-medium text-white bg-banana-700"

=======
                className="text-xs px-2 py-1 rounded-full font-medium"
                style={{ 
                  backgroundColor: character.textColor,
                  color: character.backgroundColor
                }}
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
                title={trait.description}
              >
                {trait.trait}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <blockquote 
<<<<<<< HEAD
            className="italic text-sm p-3 rounded-lg bg-banana-600 text-banana-100 border-l-4 border-banana-800"
=======
            className="italic text-sm p-3 rounded-lg"
            style={{ 
              backgroundColor: `${character.textColor}30`, 
              borderLeft: `4px solid ${character.textColor}`
            }}
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
          >
            "{character.sampleQuote}"
          </blockquote>
        </div>
      </div>
      
      {isSelected && (
<<<<<<< HEAD
        <div className="absolute top-3 right-3 bg-secondary-300 text-white text-xs font-regular px-2 py-1 rounded-full shadow-md">
=======
        <div className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
          Selected
        </div>
      )}
    </div>
  );
};

export default CharacterCard;