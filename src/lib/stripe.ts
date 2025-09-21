import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
})

// Stripe configuration constants
export const STRIPE_CONFIG = {
  // You can configure different pricing tiers here
  products: {
    onboarding_service: {
      price_id: process.env.STRIPE_PRICE_ID || 'price_default', // Set in environment
      amount: 49700, // $497.00 in cents
      currency: 'usd',
      name: 'Premium Onboarding Service',
      description: 'White-glove client onboarding setup with dedicated VA team'
    }
  },

  checkout: {
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/next-steps?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/?cancelled=true`,
    mode: 'payment' as const,
    billing_address_collection: 'required' as const,
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'NL', 'ES', 'IT', 'SE', 'DK', 'NO', 'FI']
    }
  }
}