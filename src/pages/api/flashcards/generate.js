import { generateFlashcardContent } from '../../../services/openai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { topic } = req.body;
    const flashcardContent = await generateFlashcardContent(topic);
    res.status(200).json(flashcardContent);
  } catch (error) {
    res.status(500).json({ message: 'Error generating flashcard', error: error.message });
  }
}
