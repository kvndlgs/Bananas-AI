import React from 'react';
import { Link } from 'react-router-dom';
import { Banana, Mic, Sparkles, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
<<<<<<< HEAD
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-banana-600 leading-tight mb-4">
                Generate Hilarious AI Podcast Conversations
              </h1>
              <p className="text-banana-600 text-opacity-90 text-lg mb-8 max-w-lg">
=======
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-light via-primary to-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-4">
                Generate Hilarious AI Podcast Conversations
              </h1>
              <p className="text-white text-opacity-90 text-lg mb-8 max-w-lg">
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
                Create absurd podcast episodes featuring our cast of unhinged
                characters with bizarre personality quirks.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/interview">
                  <Button
                    variant="primary"
                    size="lg"
                    className="bg-primary text-white hover:bg-primary-100"
                    leftIcon={<Mic size={20} />}
                  >
                    Create Podcast
                  </Button>
                </Link>
                {!user && (
                  <Link to="/signup">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white/10"
                    >
                      Sign Up Free
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
<<<<<<< HEAD
                  <Banana className="w-40 h-40 text-banana-400 animate-float" />
=======
                  <Banana className="w-40 h-40 text-white animate-float" />
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce-slow">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg animate-pulse-slow">
<<<<<<< HEAD
                  <Sparkles className="w-8 h-8 text-banana-600" />
=======
                  <Sparkles className="w-8 h-8 text-secondary" />
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-neutral-900 mb-4">
              Meet Our Eccentric Podcast Personalities
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Our AI characters come with bizarre personality disorders, strange
              obsessions, and questionable expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="h-8 w-8 text-primary" />}
              title="Batsh*t Crazy Cast"
              description="Choose from our gallery of absurd characters, each with their own unique quirks and personality disorders."
            />
            <FeatureCard
              icon={<Mic className="h-8 w-8 text-primary" />}
              title="Generate Conversations"
              description="Create hilarious interview scenarios by selecting a host, guest, and topic of discussion."
            />
            <FeatureCard
              icon={<Sparkles className="h-8 w-8 text-primary" />}
              title="Save Your Favorites"
              description="Sign in to save your favorite generated podcasts and share them with friends."
            />
<<<<<<< HEAD
          </div>``
=======
          </div>
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-neutral-900 mb-6">
            Ready to Create Your First Absurd Podcast?
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Jump in and start generating conversations between our unhinged
            characters. No production skills required!
          </p>
          <Link to="/interview">
            <Button variant="primary" size="lg" leftIcon={<Mic size={20} />}>
              Create Your Podcast Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="rounded-full bg-primary-light/20 w-16 h-16 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </div>
  );
};

export default HomePage;
