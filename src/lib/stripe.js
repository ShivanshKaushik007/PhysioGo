import { loadStripe } from '@stripe/stripe-js';

// Make sure to add your publishable key to .env.local
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default stripePromise;