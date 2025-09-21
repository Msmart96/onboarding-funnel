import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }

    let event

    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object

        // Update payment status in database
        const { error: updateError } = await supabase
          .from('coach_payments')
          .update({
            status: 'succeeded',
            updated_at: new Date().toISOString()
          })
          .eq('stripe_session_id', session.id)

        if (updateError) {
          console.error('Failed to update payment status:', updateError)
        }

        // Log the successful payment
        await supabase.rpc('log_event', {
          event_type_param: 'payment_succeeded',
          payload_param: {
            session_id: session.id,
            customer_email: session.customer_details?.email,
            amount_total: session.amount_total,
            currency: session.currency
          }
        })

        // TODO: Trigger welcome email automation
        // This could integrate with Resend, SendGrid, or your automation platform
        console.log('Payment succeeded for session:', session.id)

        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object

        // Update payment status to cancelled
        await supabase
          .from('coach_payments')
          .update({
            status: 'cancelled',
            updated_at: new Date().toISOString()
          })
          .eq('stripe_session_id', session.id)

        // Log the expired session
        await supabase.rpc('log_event', {
          event_type_param: 'checkout_expired',
          payload_param: {
            session_id: session.id,
            customer_email: session.customer_details?.email
          }
        })

        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object

        // Find and update the payment record
        const sessions = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
          limit: 1
        })

        if (sessions.data.length > 0) {
          await supabase
            .from('coach_payments')
            .update({
              status: 'failed',
              updated_at: new Date().toISOString()
            })
            .eq('stripe_session_id', sessions.data[0].id)

          // Log the failed payment
          await supabase.rpc('log_event', {
            event_type_param: 'payment_failed',
            payload_param: {
              payment_intent_id: paymentIntent.id,
              session_id: sessions.data[0].id,
              last_payment_error: paymentIntent.last_payment_error
            }
          })
        }

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}