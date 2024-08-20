import Stripe from 'stripe';
import { getAuth } from '../../../lib/clerk';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

    // Retrieve the Stripe customer ID for the user
    // This assumes you have stored the Stripe customer ID in your database
    const stripeCustomerId = await getStripeCustomerId(userId);

    if (!stripeCustomerId) {
      return res.status(404).json({ error: 'Stripe customer not found' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${req.headers.origin}/dashboard`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// This function should be implemented to retrieve the Stripe customer ID from your database
async function getStripeCustomerId(userId) {
  // Implementation depends on your database setup
  // Return the Stripe customer ID associated with the user
}
