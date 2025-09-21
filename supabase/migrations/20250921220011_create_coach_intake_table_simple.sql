-- Create the coach_intake table for questionnaire answers
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS coach_intake (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,
    program_link TEXT NOT NULL,
    intake_form_url TEXT,
    need_intake_form BOOLEAN NOT NULL DEFAULT false,
    faq_document TEXT NOT NULL,
    custom_resource TEXT,
    email_tone VARCHAR(50) NOT NULL CHECK (email_tone IN ('professional', 'friendly', 'motivational')),
    upcoming_events TEXT,
    email_signature TEXT NOT NULL,
    question_handling VARCHAR(50) NOT NULL CHECK (question_handling IN ('forward', 'flag', 'other')),
    other_handling TEXT,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'processed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies to allow inserts
ALTER TABLE coach_intake ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow insert for coach intake" ON coach_intake FOR INSERT WITH CHECK (true);

-- Create log_event function that the API expects
CREATE OR REPLACE FUNCTION log_event(event_type_param TEXT, payload_param JSONB DEFAULT '{}')
RETURNS UUID AS $$
DECLARE
    new_id UUID;
BEGIN
    -- For now, just return a random UUID since we don't have event_log table yet
    RETURN gen_random_uuid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;