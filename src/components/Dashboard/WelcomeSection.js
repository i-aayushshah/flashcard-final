import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const WelcomeSection = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome back, {user?.name || 'User'}!</h2>
      <p className="text-gray-600">
        Ready to boost your learning? Create new flashcards or start a study session to improve your knowledge.
      </p>
    </div>
  );
};

export default WelcomeSection;
