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
      <div className="p-6 text-neutral-900">
        <div className="flex items-start mb-4">
          <div 
            className="w-20 h-20 rounded-full overflow-hidden border-4 flex-shrink-0"
            style={{ borderColor: character.textColor }}
          >
            <img 
              src={character.avatarUrl} 
              alt={character.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-4">
            <h3 
              className="font-display font-bold text-xl mb-1"
              style={{ color: character.textColor }}
            >
              {character.name}
            </h3>
            <p className="text-sm font-medium opacity-90">{character.title}</p>
          </div>
        </div>

        <div className="mb-4">
          <p 
            className="text-sm leading-relaxed opacity-90 mb-3"
            style={{ color: '#212121' }}
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
                className="text-xs px-2 py-1 rounded-full font-medium"
                style={{ 
                  backgroundColor: character.textColor,
                  color: character.backgroundColor
                }}
                title={trait.description}
              >
                {trait.trait}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <blockquote 
            className="italic text-sm p-3 rounded-lg"
            style={{ 
              backgroundColor: `${character.textColor}30`, 
              borderLeft: `4px solid ${character.textColor}`
            }}
          >
            "{character.sampleQuote}"
          </blockquote>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute top-3 right-3 bg-primary text-neutral-800 text-xs font-bold px-2 py-1 rounded-full">
          Selected
        </div>
      )}
    </div>
  );
};

export default CharacterCard;