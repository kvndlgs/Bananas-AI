import React, { useState } from 'react';
import { Mic, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import { Character } from '../../data/characters';

interface InterviewFormProps {
  selectedHost?: Character;
  selectedGuest?: Character;
  onCreateInterview: (topic: string) => void;
  isGenerating: boolean;
}

const InterviewForm: React.FC<InterviewFormProps> = ({
  selectedHost,
  selectedGuest,
  onCreateInterview,
  isGenerating,
}) => {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && selectedHost && selectedGuest) {
      onCreateInterview(topic);
    }
  };

  const isDisabled =
    !selectedHost || !selectedGuest || !topic.trim() || isGenerating;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-display font-bold text-neutral-800 mb-4">
        Generate Interview
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="topic"
            className="block text-sm font-medium text-neutral-700 mb-1"
          >
            Interview Topic
          </label>
          <input
            type="text"
            id="topic"
            placeholder="e.g., Aerodynamic of a wild hog, Latest Consiparations Theories, AI World Domination..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            disabled={isGenerating}
          />
          <p className="mt-2 text-sm text-neutral-500">
            Choose a controversial or absurd topic for the best results!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <p className="text-sm font-medium text-neutral-700 mb-2">
              Selected Host
            </p>
            {selectedHost ? (
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={selectedHost.avatarUrl}
                    alt={selectedHost.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-neutral-900">
                    {selectedHost.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {selectedHost.title}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-neutral-500 italic">
                No host selected
              </p>
            )}
          </div>

          <div className="flex-1 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
            <p className="text-sm font-medium text-neutral-700 mb-2">
              Selected Guest
            </p>
            {selectedGuest ? (
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={selectedGuest.avatarUrl}
                    alt={selectedGuest.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-neutral-900">
                    {selectedGuest.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {selectedGuest.title}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-neutral-500 italic">
                No guest selected
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isGenerating}
            disabled={isDisabled}
            leftIcon={isGenerating ? undefined : <Sparkles size={18} />}
            rightIcon={isGenerating ? undefined : <Mic size={18} />}
          >
            {isGenerating ? 'Generating Podcast...' : 'Generate Podcast'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InterviewForm;
