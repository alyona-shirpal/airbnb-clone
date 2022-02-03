import Stripe from 'stripe';

import { config } from '../config';

const stripe = new Stripe(config.API_STRIPE_KEY, {
    apiVersion: '2020-08-27',
    typescript: true
});

export { stripe };
