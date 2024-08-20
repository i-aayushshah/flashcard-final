import React from 'react';
import Flashcard from './Flashcard';

const FlashcardList = ({ flashcards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {flashcards.map((flashcard) => (
        <Flashcard
          key={flashcard.id}
          front={flashcard.front}
          back={flashcard.back}
        />
      ))}
    </div>
  );
};

export default FlashcardList;
