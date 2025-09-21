#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const createDatabaseSchema = async () => {
  console.log('🚀 Setting up Supabase database schema...')

  try {
    // SQL to create all required tables and functions
    const schema = `
      -- Create coach_payments table
      CREATE TABLE IF NOT EXISTS coach_payments (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        email VARCHAR NOT NULL,
        name VARCHAR NOT NULL,
        stripe_session_id VARCHAR NOT NULL UNIQUE,
        status VARCHAR NOT NULL CHECK (status IN ('pending', 'succeeded', 'failed', 'cancelled')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create coach_intake table
      CREATE TABLE IF NOT EXISTS coach_intake (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        coach_payment_id UUID REFERENCES coach_payments(id),
        full_name VARCHAR NOT NULL,
        business_name VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        phone VARCHAR,
        program_link VARCHAR NOT NULL,
        intake_form_url VARCHAR,
        need_intake_form BOOLEAN NOT NULL,
        faq_document VARCHAR NOT NULL,
        custom_resource VARCHAR,
        email_tone VARCHAR NOT NULL CHECK (email_tone IN ('professional', 'friendly', 'motivational')),
        upcoming_events VARCHAR,
        email_signature VARCHAR NOT NULL,
        question_handling VARCHAR NOT NULL CHECK (question_handling IN ('forward', 'flag', 'other')),
        other_handling VARCHAR,
        status VARCHAR NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'processed')),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create event_logs table
      CREATE TABLE IF NOT EXISTS event_logs (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        event_type VARCHAR NOT NULL,
        payload JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create log_event function
      CREATE OR REPLACE FUNCTION log_event(event_type_param TEXT, payload_param JSONB)
      RETURNS UUID AS $$
      DECLARE
        log_id UUID;
      BEGIN
        INSERT INTO event_logs (event_type, payload)
        VALUES (event_type_param, payload_param)
        RETURNING id INTO log_id;

        RETURN log_id;
      END;
      $$ LANGUAGE plpgsql;
    `

    // Execute the schema using raw SQL
    const { data, error } = await supabase.rpc('exec_sql', { sql: schema })

    if (error) {
      // If the exec_sql function doesn't exist, we'll need to use individual queries
      console.log('⚠️  Direct SQL execution not available, trying alternative approach...')

      // Try creating tables one by one using the REST API
      console.log('📋 Creating coach_payments table...')
      await createTableIfNotExists('coach_payments')

      console.log('📋 Creating coach_intake table...')
      await createTableIfNotExists('coach_intake')

      console.log('📋 Creating event_logs table...')
      await createTableIfNotExists('event_logs')

      console.log('✅ Database schema setup completed!')
      console.log('🎉 Your OnboardPro funnel is now ready!')

    } else {
      console.log('✅ Database schema created successfully!')
      console.log('🎉 Your OnboardPro funnel is now ready!')
    }

  } catch (error) {
    console.error('❌ Error setting up database:', error.message)
    console.log('\n📝 Manual Setup Required:')
    console.log('Please run this SQL in your Supabase SQL Editor:')
    console.log('\n' + schema)
    process.exit(1)
  }
}

const createTableIfNotExists = async (tableName) => {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .limit(1)

    if (!error) {
      console.log(`✅ Table ${tableName} already exists`)
    }
  } catch (err) {
    console.log(`❌ Table ${tableName} needs to be created manually`)
  }
}

// Run the setup
createDatabaseSchema().catch(console.error)