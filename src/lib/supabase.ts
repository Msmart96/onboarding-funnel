import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (supabaseClient) {
    return supabaseClient
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
  }

  if (!supabaseAnonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseClient
}

// Types based on our database schema
export interface CoachPayment {
  id: string
  email: string
  name: string
  stripe_session_id: string
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled'
  created_at: string
}

export interface CoachIntake {
  id: string
  coach_payment_id: string

  // Basic Information
  full_name: string
  business_name: string
  email: string
  phone: string

  // Program Access & Resources
  program_link: string
  intake_form_url?: string
  need_intake_form: boolean
  faq_document: string
  custom_resource?: string

  // Email Setup
  email_tone: 'professional' | 'friendly' | 'motivational'
  upcoming_events?: string
  email_signature: string

  // Communication Protocol
  question_handling: 'forward' | 'flag' | 'other'
  other_handling?: string

  status: 'draft' | 'submitted' | 'processed'
  created_at: string
  updated_at: string
}

export interface EventLog {
  id: string
  event_type: string
  payload: Record<string, unknown>
  created_at: string
}
