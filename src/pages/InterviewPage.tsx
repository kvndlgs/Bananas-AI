import React, { useState } from 'react';
import { characters } from '../data/characters';
import { Character } from '../data/characters';
import CharacterGrid from '../components/characters/CharacterGrid';
import InterviewForm from '../components/interview/InterviewForm';
import ConversationDisplay from '../components/interview/ConversationDisplay';
<<<<<<< HEAD
import { useConversationGenerator } from '../utils/aiConversationGenerator';
=======
import { generateConversation } from '../utils/conversationGenerator';
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface ConversationTurn {
  character: Character;
  text: string;
}

<<<<<<< HEAD
interface PodcastGeneratorProps {
  onConversationGenerated?: (conversation: ConversationTurn[]) => void;
}



const InterviewPage: React.FC<PodcastGeneratorProps> = ({onConversationGenerated}) => {
=======
const InterviewPage: React.FC = () => {
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
  const { user, isLoading } = useAuth();
  const [selectedHost, setSelectedHost] = useState<Character | undefined>();
  const [selectedGuest, setSelectedGuest] = useState<Character | undefined>();
  const [topic, setTopic] = useState<string>('');
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
<<<<<<< HEAD
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
=======
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1

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
<<<<<<< HEAD
  
=======

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

>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

<<<<<<< HEAD

=======
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
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1

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

<<<<<<< HEAD
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
=======
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

>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
        {conversation.length > 0 && (
          <ConversationDisplay
            conversation={conversation}
            topic={topic}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
<<<<<<< HEAD
            onRegenerate={handleRegenerate}
=======
            onRegenerate={handleRegenerateConversation}
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
          />
        )}
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default InterviewPage;
=======
export default InterviewPage;
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
