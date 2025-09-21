-- Onboarding Funnel Database Schema
-- Based on the architecture document requirements

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Coach Payments table
CREATE TABLE coach_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    stripe_session_id VARCHAR(255) UNIQUE,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coach Intake table (questionnaire responses)
CREATE TABLE coach_intake (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coach_payment_id UUID REFERENCES coach_payments(id) ON DELETE CASCADE,

    -- Basic Information
    full_name VARCHAR(255) NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(255) NOT NULL,

    -- Program Access & Resources
    program_link TEXT NOT NULL,
    intake_form_url TEXT,
    need_intake_form BOOLEAN NOT NULL DEFAULT false,
    faq_document TEXT NOT NULL,
    custom_resource TEXT,

    -- Email Setup
    email_tone VARCHAR(50) NOT NULL CHECK (email_tone IN ('professional', 'friendly', 'motivational')),
    upcoming_events TEXT,
    email_signature TEXT NOT NULL,

    -- Communication Protocol
    question_handling VARCHAR(50) NOT NULL CHECK (question_handling IN ('forward', 'flag', 'other')),
    other_handling TEXT,

    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'processed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event Log table for tracking actions
CREATE TABLE event_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_type VARCHAR(255) NOT NULL,
    payload JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- File Uploads table (for tracking uploaded documents)
CREATE TABLE file_uploads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    coach_intake_id UUID REFERENCES coach_intake(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_type VARCHAR(50),
    file_size INTEGER,
    upload_status VARCHAR(50) DEFAULT 'pending' CHECK (upload_status IN ('pending', 'completed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX idx_coach_payments_email ON coach_payments(email);
CREATE INDEX idx_coach_payments_stripe_session ON coach_payments(stripe_session_id);
CREATE INDEX idx_coach_intake_payment_id ON coach_intake(coach_payment_id);
CREATE INDEX idx_coach_intake_status ON coach_intake(status);
CREATE INDEX idx_event_log_type ON event_log(event_type);
CREATE INDEX idx_event_log_created ON event_log(created_at);

-- RLS (Row Level Security) policies
ALTER TABLE coach_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE coach_intake ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (can be customized based on auth requirements)
CREATE POLICY "Coach payments are viewable by authenticated users" ON coach_payments
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Coach intake is viewable by authenticated users" ON coach_intake
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow insert for coach payments" ON coach_payments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow insert for coach intake" ON coach_intake
    FOR INSERT WITH CHECK (true);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for auto-updating timestamps
CREATE TRIGGER update_coach_payments_updated_at BEFORE UPDATE ON coach_payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_coach_intake_updated_at BEFORE UPDATE ON coach_intake
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to log events
CREATE OR REPLACE FUNCTION log_event(event_type_param TEXT, payload_param JSONB DEFAULT '{}')
RETURNS UUID AS $$
DECLARE
    new_id UUID;
BEGIN
    INSERT INTO event_log (event_type, payload)
    VALUES (event_type_param, payload_param)
    RETURNING id INTO new_id;

    RETURN new_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;