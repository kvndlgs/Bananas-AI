import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { Plus, Save, Share2, Trash2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabase';
import { Character } from '../data/characters';
import CharacterCreationModal from '../components/characters/CharacterCreationModal';

const CustomCharactersPage: React.FC = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { isPremium } = useSubscription();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadCustomCharacters();
    }
  }, [user]);

  const loadCustomCharacters = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('custom_characters')
        .select('*')
        .eq('user_id', user?.id);

      if (error) throw error;
      setCharacters(data || []);
    } catch (error) {
      console.error('Error loading custom characters:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCharacter = async (id: string) => {
    try {
      const { error } = await supabase
        .from('custom_characters')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await loadCustomCharacters();
    } catch (error) {
      console.error('Error deleting character:', error);
    }
  };

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isPremium) {
    return (
      <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-display font-bold text-neutral-900 mb-4">
            Premium Feature
          </h1>
          <p className="text-neutral-600 mb-8">
            Custom character creation is only available for premium users.
            Upgrade your account to unlock this feature!
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => (window.location.href = '/premium')}
          >
            Upgrade to Premium
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-neutral-900 mb-2">
              Custom Characters
            </h1>
            <p className="text-neutral-600">
              Create and manage your own podcast characters
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => setIsCreating(true)}
            leftIcon={<Plus size={18} />}
          >
            Create Character
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        ) : characters.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-semibold text-neutral-800 mb-2">
              No Custom Characters Yet
            </h2>
            <p className="text-neutral-600 mb-6">
              Create your first character to get started!
            </p>
            <Button
              variant="primary"
              onClick={() => setIsCreating(true)}
              leftIcon={<Plus size={18} />}
            >
              Create Your First Character
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {characters.map((character) => (
              <div
                key={character.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div
                  className="h-32 bg-cover bg-center relative"
                  style={{
                    backgroundColor: character.backgroundColor,
                  }}
                >
                  <img
                    src={character.avatarUrl}
                    alt={character.name}
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white object-cover"
                  />
                </div>
                <div className="p-6 pt-16">
                  <h3 className="text-xl font-semibold text-neutral-900 mb-1">
                    {character.name}
                  </h3>
                  <p className="text-sm text-neutral-500 mb-3">
                    {character.title}
                  </p>
                  <p className="text-neutral-600 mb-4">
                    {character.description}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Save size={16} />}
                      onClick={() => {
                        /* TODO: Implement edit */
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Share2 size={16} />}
                      onClick={() => {
                        /* TODO: Implement share */
                      }}
                    >
                      Share
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Trash2 size={16} />}
                      onClick={() => handleDeleteCharacter(character.id)}
                      className="text-error hover:bg-error/10"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <CharacterCreationModal
          isOpen={isCreating}
          onClose={() => setIsCreating(false)}
          onCharacterCreated={loadCustomCharacters}
        />
      </div>
    </div>
  );
};

export default CustomCharactersPage;
