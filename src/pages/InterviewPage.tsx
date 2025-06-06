import React, { useState } from 'react';
import { characters } from '../data/characters';
import { Character } from '../data/characters';
import CharacterGrid from '../components/characters/CharacterGrid';
import InterviewForm from '../components/interview/InterviewForm';
import ConversationDisplay from '../components/interview/ConversationDisplay';
import { generateConversation } from '../utils/conversationGenerator';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface ConversationTurn {
  character: Character;
  text: string;
}

const InterviewPage: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [selectedHost, setSelectedHost] = useState<Character | undefined>();
  const [selectedGuest, setSelectedGuest] = useState<Character | undefined>();
  const [topic, setTopic] = useState<string>('');
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSelectHost = (character: Character) => {
    setSelectedHost(character);
    if (selectedGuest?.id === character.id) {
      setSelectedGuest(undefined);
    }
  };

  const handleSelectGuest = (character: Character) => {
    setSelectedGuest(character);
    if (selectedHost?.id === character.id) {
      setSelectedHost(undefined);
    }
  };

  const handleCreateInterview = async (topic: string) => {
    if (!selectedHost || !selectedGuest) return;

    setTopic(topic);
    setIsGenerating(true);

    try {
      const newConversation = await generateConversation(
        selectedHost,
        selectedGuest,
        topic,
        5
      );
      setConversation(newConversation);
    } catch (error) {
      console.error('Error generating conversation:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRegenerateConversation = async () => {
    if (!selectedHost || !selectedGuest || !topic) return;

    setIsGenerating(true);

    try {
      const newConversation = await generateConversation(
        selectedHost,
        selectedGuest,
        topic,
        5
      );
      setConversation(newConversation);
    } catch (error) {
      console.error('Error regenerating conversation:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
            Create Your Podcast
          </h1>
          <p className="text-neutral-600 max-w-3xl">
            Select a host and guest from our cast of quirky characters, choose a
            topic, and watch the absurdity unfold as they engage in a ridiculous
            conversation.
          </p>
        </div>

        <CharacterGrid
          characters={characters}
          selectedHost={selectedHost}
          selectedGuest={selectedGuest}
          onSelectHost={handleSelectHost}
          onSelectGuest={handleSelectGuest}
        />

        <InterviewForm
          selectedHost={selectedHost}
          selectedGuest={selectedGuest}
          onCreateInterview={handleCreateInterview}
          isGenerating={isGenerating}
        />

        {conversation.length > 0 && (
          <ConversationDisplay
            conversation={conversation}
            topic={topic}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onRegenerate={handleRegenerateConversation}
          />
        )}
      </div>
    </div>
  );
};

export default InterviewPage;