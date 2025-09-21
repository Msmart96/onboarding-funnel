import { NextRequest, NextResponse } from 'next/server'
import { getStripe, STRIPE_CONFIG } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe()
    const body = await request.json()
    const { email, name, businessName } = body

    // Validate required fields
    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: STRIPE_CONFIG.checkout.mode,
      billing_address_collection: STRIPE_CONFIG.checkout.billing_address_collection,

      line_items: [
        {
          price_data: {
            currency: STRIPE_CONFIG.products.onboarding_service.currency,
            product_data: {
              name: STRIPE_CONFIG.products.onboarding_service.name,
              description: STRIPE_CONFIG.products.onboarding_service.description,
              images: [`${process.env.NEXT_PUBLIC_APP_URL}/og-image.png`], // Add your product image
            },
            unit_amount: STRIPE_CONFIG.products.onboarding_service.amount,
          },
          quantity: 1,
        },
      ],

      customer_email: email,

      metadata: {
        customer_name: name,
        business_name: businessName || '',
        product_type: 'onboarding_service'
      },

      success_url: STRIPE_CONFIG.checkout.success_url,
      cancel_url: STRIPE_CONFIG.checkout.cancel_url,

      // Enable automatic tax calculation (optional)
      automatic_tax: { enabled: true },

      // Allow promotion codes
      allow_promotion_codes: true,
    })

    // Store initial payment record in database
    const { error: dbError } = await supabase
      .from('coach_payments')
      .insert([
        {
          email,
          name,
          stripe_session_id: session.id,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      // Continue anyway, as payment session was created
    }

    // Log the checkout initiation
    await supabase.rpc('log_event', {
      event_type_param: 'checkout_initiated',
      payload_param: {
        session_id: session.id,
        customer_email: email,
        customer_name: name,
        business_name: businessName,
        amount: STRIPE_CONFIG.products.onboarding_service.amount
      }
    })

    return NextResponse.json({
      checkout_url: session.url,
      session_id: session.id
    })

  } catch (error) {
    console.error('Checkout error:', error)

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

// Handle checkout session retrieval
export async function GET(request: NextRequest) {
  try {
    const stripe = getStripe()
    const url = new URL(request.url)
    const session_id = url.searchParams.get('session_id')

    if (!session_id) {
      return NextResponse.json(
        { error: 'Missing session_id parameter' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.retrieve(session_id)

    return NextResponse.json({
      session: {
        id: session.id,
        payment_status: session.payment_status,
        customer_details: session.customer_details,
        metadata: session.metadata
      }
    })

  } catch (error) {
    console.error('Session retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    )
  }
}
