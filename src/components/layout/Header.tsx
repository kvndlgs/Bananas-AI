import React from 'react';
import { Link } from 'react-router-dom';
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
                </Link>
              </nav>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm text-banana-400 hidden md:block">
                  <Link to="/profile" className="w-20">
                    <img src='https://i.imgur.com/GbcIuFI.png'  alt='avatar' className='w-8 border-2 rounded-full border-banana-500' />
                 </Link>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
            
                  onClick={signOut}
                  leftIcon={<LogOut size={16} />}
                >
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
