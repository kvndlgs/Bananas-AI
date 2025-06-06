import React, { useState } from 'react';
import { characters } from '../data/characters';
import { Character } from '../data/characters';
import CharacterGrid from '../components/characters/CharacterGrid';
import InterviewForm from '../components/interview/InterviewForm';
import ConversationDisplay from '../components/interview/ConversationDisplay';
import { useConversationGenerator } from '../utils/aiConversationGenerator';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface ConversationTurn {
  character: Character;
  text: string;
}

interface PodcastGeneratorProps {
  onConversationGenerated?: (conversation: ConversationTurn[]) => void;
}



const InterviewPage: React.FC<PodcastGeneratorProps> = ({onConversationGenerated}) => {
  const { user, isLoading } = useAuth();
  const [selectedHost, setSelectedHost] = useState<Character | undefined>();
  const [selectedGuest, setSelectedGuest] = useState<Character | undefined>();
  const [topic, setTopic] = useState<string>('');
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [conversationStyle, setConversationStyle] = useState<'debate' | 'interview' | 'casual' | 'podcast'>('podcast');

  const { generateConversation } = useConversationGenerator();



const handleGenerateConversation = async () => {
    if (!topic.trim() || !selectedHost || !selectedGuest) {
      alert('Please select at least 2 characters and enter a topic');
      return;
    }

    setIsGenerating(true);
    
    try {

      const charactersForGeneration = [ selectedHost, selectedGuest];

      const newConversation = await generateConversation(
        topic,
        charactersForGeneration,
        {
          turnsPerCharacter: 2,
          style: conversationStyle
        }
      );
      
      setConversation(newConversation);
      onConversationGenerated?.(newConversation);
      
    } catch (error) {
      console.error('Failed to generate conversation:', error);
      alert('Failed to generate conversation. Please check your API key and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectedGuest = (character: Character) => {
    setSelectedGuest(character);
  };

  const handleSelectedHost = (character: Character) => {
    setSelectedHost(character);
  }

  const handleRegenerate = () => {
    if (conversation.length > 0) {
      handleGenerateConversation();
    }
  };

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
  
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
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

        {/* Characters Selection */}
        <CharacterGrid
          characters={characters}
          selectedGuest={selectedGuest}
          selectedHost={selectedHost}
          onSelectedHost={handleSelectedHost}
          onSselectedGuest={handleSelectedGuest}
        />

        {/* Interview Form */}
        <InterviewForm
          selectedHost={selectedGuest}
          selectedGuest={selectedHost}
          topic={topic}
          onTopicChange={setTopic}
          conversationStyle={conversationStyle}
          onStyleChange={setConversationStyle}
          onCreateInterview={handleGenerateConversation}
          isGenerating={isGenerating}
        />

        {/* Conversation Display */}
        {conversation.length > 0 && (
          <ConversationDisplay
            conversation={conversation}
            topic={topic}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onRegenerate={handleRegenerate}
          />
        )}
      </div>
    </div>
  );
};

export default InterviewPage;
