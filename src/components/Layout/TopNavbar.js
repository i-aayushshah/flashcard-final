import React from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import Button from '../UI/Button';

const TopNavbar = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(); 
    router.push('/');
  };

  return (
    <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-indigo-600">
      <div className="flex items-center">
        <span className="text-gray-800 text-xl font-semibold">Dashboard</span>
      </div>
      <div className="flex items-center">
        <span className="text-gray-800 mr-4">{user?.email}</span>
        <Button onClick={handleSignOut} variant="secondary">Sign Out</Button>
      </div>
    </header>
  );
};

export default TopNavbar;
