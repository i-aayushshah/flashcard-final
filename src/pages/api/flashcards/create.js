import { getAuth } from '../../../lib/clerk';
import { db } from '../../../lib/firebase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const auth = getAuth(req);
    const { userId } = auth;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { front, back } = req.body;

    const newFlashcard = {
      userId,
      front,
      back,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection('flashcards').add(newFlashcard);

    res.status(201).json({ id: docRef.id, ...newFlashcard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
