import React from 'react';
import { Link } from 'react-router-dom';
import { Banana, User, LogOut } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Banana className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Bananas
              </span>
            </Link>
            <div className="hidden md:block ml-10">
              <nav className="flex space-x-4">
                <Link
                  to="/"
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/interview"
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors duration-200"
                >
                  Create Podcast
                </Link>
                <Link
                  to="/customcharacters"
                  className="px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors duration-200"
                >
                  Create Characters
                </Link>
              </nav>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm text-neutral-700 hidden md:block">
                  {user.email}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  leftIcon={<LogOut size={16} />}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<User size={16} />}
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
