import React from 'react';
import { useRouter } from 'next/router';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import FlashcardEditor from '../../components/Flashcard/FlashcardEditor';
import { useFlashcards } from '../../hooks/useFlashcards';

export default function EditFlashcard() {
  const router = useRouter();
  const { id } = router.query;
  const { flashcards, editFlashcard } = useFlashcards();

  const flashcard = flashcards.find(card => card.id === id);

  const handleSave = async (updatedFlashcard) => {
    await editFlashcard(id, updatedFlashcard);
    router.push('/dashboard');
  };

  if (!flashcard) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">Edit Flashcard</h1>
      <FlashcardEditor initialData={flashcard} onSave={handleSave} />
    </DashboardLayout>
  );
}
