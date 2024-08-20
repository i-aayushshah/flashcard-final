import React, { useState } from 'react';
import Button from '../UI/Button';
import Input from '../UI/Input';
import axios from 'axios';

const FlashcardEditor = ({ onSave }) => {
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedFlashcards, setGeneratedFlashcards] = useState([]);
  const [error, setError] = useState('');

  const handleGenerateFlashcards = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/generate-flashcards', {
        notes: notes,
      });
      setGeneratedFlashcards(response.data.flashcards || []);
    } catch (error) {
      console.error('Error generating flashcards:', error.response?.data || error.message);
      setGeneratedFlashcards([]);
      setError('Failed to generate flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFlashcard = (flashcard) => {
    onSave(flashcard);
  };

  const handleSaveAllFlashcards = () => {
    generatedFlashcards.forEach(flashcard => {
      handleSaveFlashcard(flashcard);
    });
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-32 p-2 border border-gray-300 rounded-md"
        placeholder="Paste your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Button onClick={handleGenerateFlashcards} disabled={loading}>
        {loading ? 'Generating Flashcards...' : 'Generate Flashcards'}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-4">
        {generatedFlashcards.length > 0 && (
          <div className="space-y-2">
            {generatedFlashcards.map((flashcard, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded-md">
                <p><strong>Front:</strong> {flashcard.front}</p>
                <p><strong>Back:</strong> {flashcard.back}</p>
                <Button onClick={() => handleSaveFlashcard(flashcard)}>
                  Save Flashcard
                </Button>
              </div>
            ))}
            <Button onClick={handleSaveAllFlashcards}>
              Save All Flashcards
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardEditor;
