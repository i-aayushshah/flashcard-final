import { getAuth } from '../../../lib/clerk';
import { db } from '../../../lib/firebase';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  try {
    const auth = getAuth(req);
    const { userId } = auth;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;
    const { front, back } = req.body;

    const flashcardRef = db.collection('flashcards').doc(id);
    const doc = await flashcardRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Flashcard not found' });
    }

    if (doc.data().userId !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await flashcardRef.update({ front, back });

    res.status(200).json({ message: 'Flashcard updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
