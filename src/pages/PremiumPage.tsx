import React from 'react';
import { Crown, Sparkles, Users, Share2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { useSubscription } from '../contexts/SubscriptionContext';

const PremiumPage: React.FC = () => {
  const { isPremium } = useSubscription();

  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Custom Characters',
      description:
        'Create your own unique podcast hosts and guests with distinct personalities.',
    },
    {
      icon: <Share2 className="h-8 w-8 text-primary" />,
      title: 'Character Sharing',
      description: 'Share your created characters with other premium users.',
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: 'Mix & Match',
      description:
        'Combine custom and pre-made characters for dynamic conversations.',
    },
  ];

  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Crown className="h-16 w-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl font-display font-bold text-neutral-900 mb-4">
            Upgrade to Premium
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Unlock the full potential of your podcast simulations with premium
            features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="rounded-full bg-primary-light/20 w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white text-center">
            <h2 className="text-3xl font-display font-bold mb-2">
              Premium Membership
            </h2>
            <p className="text-white/90 text-lg">
              Unlock all features and create unlimited characters
            </p>
          </div>

          <div className="p-8">
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-neutral-700">
                <Sparkles className="h-5 w-5 text-primary mr-3" />
                Create unlimited custom characters
              </li>
              <li className="flex items-center text-neutral-700">
                <Sparkles className="h-5 w-5 text-primary mr-3" />
                Access to premium character templates
              </li>
              <li className="flex items-center text-neutral-700">
                <Sparkles className="h-5 w-5 text-primary mr-3" />
                Share characters with the community
              </li>
              <li className="flex items-center text-neutral-700">
                <Sparkles className="h-5 w-5 text-primary mr-3" />
                Priority access to new features
              </li>
            </ul>

            {isPremium ? (
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <p className="text-success font-medium">
                  You're already a premium member!
                </p>
              </div>
            ) : (
              <Button
                variant="primary"
                size="lg"
                fullWidth
                leftIcon={<Crown size={20} />}
                onClick={() => {
                  // TODO: Implement Stripe integration
                  console.log('Upgrade to premium clicked');
                }}
              >
                Upgrade Now - $9.99/month
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
