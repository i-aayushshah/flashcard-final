import React from 'react';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import FlashcardEditor from '../../components/Flashcard/FlashcardEditor';
import { useFlashcards } from '../../hooks/useFlashcards';
import { useRouter } from 'next/router';

export default function CreateFlashcard() {
  const { addFlashcard } = useFlashcards();
  const router = useRouter();

  const handleSave = async (flashcardData) => {
    try {
      await addFlashcard(flashcardData);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving flashcard:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">Create New Flashcard</h1>
      <FlashcardEditor onSave={handleSave} />
    </DashboardLayout>
  );
}
