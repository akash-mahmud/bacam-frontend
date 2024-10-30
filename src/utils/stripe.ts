import { loadStripe } from '@stripe/stripe-js';
import { NEXT_PUBLIC_STRIPE_CLIENT_KEY } from '../config/secrets';
const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_CLIENT_KEY ?? '');
export default stripePromise;
