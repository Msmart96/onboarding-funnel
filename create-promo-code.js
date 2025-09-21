#!/usr/bin/env node

import Stripe from 'stripe'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
})

async function createPromoCode() {
  try {
    console.log('🎟️  Creating promotional code for $497 discount...')

    // First, create a coupon for $497 off
    const coupon = await stripe.coupons.create({
      amount_off: 49700, // $497.00 in cents
      currency: 'usd',
      duration: 'once',
      name: 'OnboardPro Launch Special',
      id: 'LAUNCH497' // Custom coupon ID
    })

    console.log('✅ Coupon created:', coupon.id)

    // Then create a promotion code that customers can enter
    const promoCode = await stripe.promotionCodes.create({
      coupon: coupon.id,
      code: 'LAUNCH497', // The code customers will enter
      active: true,
      max_redemptions: 100, // Limit to 100 uses
      restrictions: {
        minimum_amount: 49700, // Must be at least $497 to use
        minimum_amount_currency: 'usd'
      }
    })

    console.log('🎉 Promotional code created successfully!')
    console.log('📋 Details:')
    console.log(`   Code: ${promoCode.code}`)
    console.log(`   Discount: $497.00 off`)
    console.log(`   Max uses: ${promoCode.max_redemptions}`)
    console.log(`   Status: ${promoCode.active ? 'Active' : 'Inactive'}`)
    console.log('\n⚠️  This means customers can get the service for FREE with code: LAUNCH497')

    return promoCode

  } catch (error) {
    if (error.code === 'resource_already_exists') {
      console.log('ℹ️  Promotional code already exists!')

      // Get the existing promo code
      const existingPromoCode = await stripe.promotionCodes.list({
        code: 'LAUNCH497',
        limit: 1
      })

      if (existingPromoCode.data.length > 0) {
        const promoCode = existingPromoCode.data[0]
        console.log('📋 Existing code details:')
        console.log(`   Code: ${promoCode.code}`)
        console.log(`   Status: ${promoCode.active ? 'Active' : 'Inactive'}`)
        console.log(`   Used: ${promoCode.times_redeemed} times`)
        return promoCode
      }
    } else {
      console.error('❌ Error creating promotional code:', error.message)
      throw error
    }
  }
}

// Run the creation
createPromoCode()
  .then(() => {
    console.log('\n🚀 Ready to use! Customers can now enter "LAUNCH497" at checkout.')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Failed to create promo code:', error.message)
    process.exit(1)
  })