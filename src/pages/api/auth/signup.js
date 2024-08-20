import { getAuth } from '../../../lib/clerk';

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

    // Here you would typically create a new user in your database
    // For this example, we'll just return a success message

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
