import { useState, useEffect } from 'react';
import { useFlashcards } from './useFlashcards';

export const useStudySession = () => {
  const { flashcards } = useFlashcards();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [sessionProgress, setSessionProgress] = useState(0);

  useEffect(() => {
    if (flashcards.length > 0) {
      setSessionProgress((currentCardIndex / flashcards.length) * 100);
    }
  }, [currentCardIndex, flashcards.length]);

  const nextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const previousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const restartSession = () => {
    setCurrentCardIndex(0);
  };

  return {
    currentCard: flashcards[currentCardIndex],
    nextCard,
    previousCard,
    restartSession,
    sessionProgress,
    isLastCard: currentCardIndex === flashcards.length - 1,
  };
};
