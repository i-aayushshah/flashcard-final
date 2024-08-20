import { getAuth } from '../../../lib/clerk';
import { db } from '../../../lib/firebase';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const auth = getAuth(req);
    const { userId } = auth;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const flashcardsRef = db.collection('flashcards').where('userId', '==', userId);
    const snapshot = await flashcardsRef.get();

    const flashcards = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(flashcards);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
