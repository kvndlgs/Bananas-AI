import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import {  User, LogOut, Mic, Compass, CreditCard } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
// import { useSubscription } from '../../contexts/SubscriptionContext';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
//  const { isPremium } = useSubscription();

  return (
    <header className="bg-white sticky top-0 z-10">
      <div className="mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex justify-between items-center h-16 py-3">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
                <img src='https://i.imgur.com/feUPOB6.png' alt='logo' className='w-12' />
            </Link>
            <div className="hidden md:block md:left-[100px]">
              <nav className="flex space-x-4">
                <Link
                  to="/interview"
                  className="flex items-center ml-16 justify-around gap-2 px-3 py-2 text-sm font-regular text-banana-800 hover:text-banana-400 transition-colors duration-200"
                >
                 <Mic size={20} />  CREATE
                </Link>
                <Link
                  to="/discover"
                  className="flex ml-16 items-center justify-around gap-2 px-3 py-2 text-sm font-regular text-banana-800 hover:text-banana-400 transition-colors duration-200"
                >
                <Compass size={20} />  DISCOVER
                </Link>
                <Link to='/subscription' className='flex ml-16 items-center justify-around gap-2 px-3 py-2 text-sm font-regular text-banana-600 hover:text-banana-400 transition-colors duration-200'>
                <CreditCard size={20} />
                 UPGRADE PLAN
=======
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
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
                </Link>
              </nav>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-3">
<<<<<<< HEAD
                <div className="text-sm text-banana-400 hidden md:block">
                  <Link to="/profile" className="w-20">
                    <img src='https://i.imgur.com/GbcIuFI.png'  alt='avatar' className='w-8 border-2 rounded-full border-banana-500' />
                 </Link>
=======
                <div className="text-sm text-neutral-700 hidden md:block">
                  {user.email}
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
                </div>
                <Button
                  variant="ghost"
                  size="sm"
<<<<<<< HEAD
            
                  onClick={signOut}
                  leftIcon={<LogOut size={16} />}
                >
=======
                  onClick={signOut}
                  leftIcon={<LogOut size={16} />}
                >
                  Sign Out
>>>>>>> 8dde1f7c81b1fb9df72cceb1a6e501e050d093c1
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
