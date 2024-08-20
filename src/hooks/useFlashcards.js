import { useState, useEffect } from 'react';
import { getFlashcards, createFlashcard, updateFlashcard, deleteFlashcard } from '../utils/api';

export const useFlashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const fetchFlashcards = async () => {
    try {
      setLoading(true);
      const data = await getFlashcards();
      setFlashcards(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addFlashcard = async (newFlashcard) => {
    try {
      const createdFlashcard = await createFlashcard(newFlashcard);
      setFlashcards([...flashcards, createdFlashcard]);
    } catch (err) {
      setError(err.message);
    }
  };

  const editFlashcard = async (id, updatedFlashcard) => {
    try {
      const updated = await updateFlashcard(id, updatedFlashcard);
      setFlashcards(flashcards.map(card => card.id === id ? updated : card));
    } catch (err) {
      setError(err.message);
    }
  };

  const removeFlashcard = async (id) => {
    try {
      await deleteFlashcard(id);
      setFlashcards(flashcards.filter(card => card.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    flashcards,
    loading,
    error,
    addFlashcard,
    editFlashcard,
    removeFlashcard,
    refreshFlashcards: fetchFlashcards,
  };
};
