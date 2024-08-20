import React, { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import WelcomeSection from '../../components/Dashboard/WelcomeSection';
import FlashcardList from '../../components/Flashcard/FlashcardList';
import { useFlashcards } from '../../hooks/useFlashcards';

export default function Dashboard() {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const { flashcards, loading, error } = useFlashcards();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push('/signin');
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded || !userId) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <WelcomeSection />
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Flashcards</h2>
        {loading ? (
          <p>Loading flashcards...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <FlashcardList flashcards={flashcards} />
        )}
      </div>
    </DashboardLayout>
  );
}
