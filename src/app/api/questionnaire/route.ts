import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = [
      'fullName',
      'businessName',
      'email',
      'phone',
      'programLink',
      'needIntakeForm',
      'faqDocument',
      'emailTone',
      'emailSignature',
      'questionHandling'
    ]

    for (const field of requiredFields) {
      if (!body[field] && body[field] !== false) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Transform the form data to match our database schema
    const intakeData = {
      // Basic Information
      full_name: body.fullName,
      business_name: body.businessName,
      email: body.email,
      phone: body.phone,

      // Program Access & Resources
      program_link: body.programLink,
      intake_form_url: body.intakeFormLink || null,
      need_intake_form: body.needIntakeForm === 'yes',
      faq_document: body.faqDocument,
      custom_resource: body.customResource || null,

      // Email Setup
      email_tone: body.emailTone,
      upcoming_events: body.upcomingEvents || null,
      email_signature: body.emailSignature,

      // Communication Protocol
      question_handling: body.questionHandling,
      other_handling: body.otherHandling || null,

      status: 'submitted'
    }

    // Insert into database
    const { data, error } = await supabase
      .from('coach_intake')
      .insert([intakeData])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to save questionnaire' },
        { status: 500 }
      )
    }

    // Log the submission event
    await supabase.rpc('log_event', {
      event_type_param: 'questionnaire_submitted',
      payload_param: {
        intake_id: data.id,
        coach_email: data.email,
        business_name: data.business_name
      }
    })

    // TODO: Trigger automation (email notifications, SOP creation, etc.)
    // This would typically integrate with Make.com, Zapier, or custom automation

    return NextResponse.json({
      success: true,
      intake_id: data.id,
      message: 'Questionnaire submitted successfully'
    })

  } catch (error) {
    console.error('Questionnaire submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const intake_id = url.searchParams.get('id')

    if (!intake_id) {
      return NextResponse.json(
        { error: 'Missing intake ID' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('coach_intake')
      .select('*')
      .eq('id', intake_id)
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Questionnaire not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data })

  } catch (error) {
    console.error('Get questionnaire error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}