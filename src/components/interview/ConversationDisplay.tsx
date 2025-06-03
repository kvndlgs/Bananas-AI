import React from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';
import { Character } from '../../data/characters';

interface ConversationTurn {
  character: Character;
  text: string;
}

interface ConversationDisplayProps {
  conversation: ConversationTurn[];
  topic: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRegenerate: () => void;
}

const ConversationDisplay: React.FC<ConversationDisplayProps> = ({
  conversation,
  topic,
  isPlaying,
  onTogglePlay,
  onRegenerate
}) => {
  if (!conversation.length) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="bg-gradient-to-r from-primary to-secondary p-4">
        <h2 className="text-xl font-display font-bold text-white">
          Interview Topic: {topic}
        </h2>
      </div>

      {/* Audio Player (Placeholder) */}
      <div className="bg-gray-100 p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="primary"
              size="sm"
              onClick={onTogglePlay}
              leftIcon={isPlaying ? <Pause size={16} /> : <Play size={16} />}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <div className="ml-4 flex-1">
              <div className="h-2 bg-gray-300 rounded-full w-full max-w-xs">
                <div className="h-2 bg-primary rounded-full" style={{ width: '35%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">3:24 / 9:45</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onRegenerate}
            leftIcon={<RefreshCw size={16} />}
          >
            Regenerate
          </Button>
        </div>
        <p className="mt-2 text-sm text-gray-500 italic">
          Note: Audio functionality coming soon!
        </p>
      </div>

      {/* Conversation Transcript */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Transcript</h3>
        <div className="space-y-6">
          {conversation.map((turn, index) => (
            <div key={index} className="flex">
              <div 
                className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2"
                style={{ borderColor: turn.character.backgroundColor }}
              >
                <img 
                  src={turn.character.avatarUrl} 
                  alt={turn.character.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center mb-1">
                  <h4 
                    className="font-medium"
                    style={{ color: turn.character.backgroundColor }}
                  >
                    {turn.character.name}
                  </h4>
                  <span className="ml-2 text-xs text-gray-500">
                    {turn.character.title}
                  </span>
                </div>
                <div 
                  className="p-3 rounded-lg" 
                  style={{ 
                    backgroundColor: `${turn.character.backgroundColor}15`,
                    borderLeft: `3px solid ${turn.character.backgroundColor}`
                  }}
                >
                  <p className="text-gray-800">{turn.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationDisplay;