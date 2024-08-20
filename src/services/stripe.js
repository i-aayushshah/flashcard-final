import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export async function createCheckoutSession(priceId) {
  const response = await fetch('/api/stripe/create-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priceId }),
  });

  const session = await response.json();
  return session;
}

export async function redirectToCustomerPortal() {
  const response = await fetch('/api/stripe/manage-billing', {
    method: 'POST',
  });

  const { url } = await response.json();
  window.location.href = url;
}
