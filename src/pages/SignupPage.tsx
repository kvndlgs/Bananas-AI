import React from 'react';
import { Navigate } from 'react-router-dom';
import { Banana } from 'lucide-react';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../contexts/AuthContext';

const SignupPage: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Banana className="h-12 w-12 text-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-display font-bold text-neutral-900">
            Create an Account
          </h2>
          <p className="mt-2 text-neutral-600">
            Sign up to start creating podcast conversations
          </p>
        </div>

        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
