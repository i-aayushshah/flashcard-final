import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const plans = [
  { name: 'Basic', price: '$9.99/month', features: ['100 flashcards', 'Basic AI generation'], priceId: 'price_1234567890' },
  { name: 'Pro', price: '$19.99/month', features: ['Unlimited flashcards', 'Advanced AI generation', 'Priority support'], priceId: 'price_0987654321' },
];

export default function PricingPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (priceId) => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId, customerId: user.id }),
      });
      const { sessionId } = await response.json();
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h1>
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
              <p className="text-3xl font-bold mb-6">{plan.price}</p>
              <ul className="mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan.priceId)}
                disabled={loading}
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                {loading ? 'Processing...' : 'Subscribe'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
