import { loadStripe } from '@stripe/stripe-js';

// Load stripe instance
export const stripePromise = loadStripe(
    process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY //publishable key identifies wich identifies our application to stripe 
);