import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import { useFlashcards } from '../../hooks/useFlashcards';
import Flashcard from '../../components/Flashcard/Flashcard';

export default function StudySession() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const { flashcards, loading, error } = useFlashcards();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/signin');
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading flashcards...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">Study Session</h1>
      {flashcards.length > 0 ? (
        <div className="flex flex-col items-center">
          <Flashcard
            front={flashcards[currentCardIndex].front}
            back={flashcards[currentCardIndex].back}
          />
          <div className="mt-4 space-x-4">
            <button
              onClick={handlePreviousCard}
              disabled={currentCardIndex === 0}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextCard}
              disabled={currentCardIndex === flashcards.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <p className="mt-4">
            Card {currentCardIndex + 1} of {flashcards.length}
          </p>
        </div>
      ) : (
        <p>No flashcards available. Create some flashcards to start studying!</p>
      )}
    </DashboardLayout>
  );
}
