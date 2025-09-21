'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  User,
  Building,
  Mail,
  Phone,
  Link as LinkIcon,
  FileText,
  Palette,
  Calendar,
  Signature,
  MessageSquare,
  Settings
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'

// Form validation schema
const questionnaireSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  businessName: z.string().min(2, 'Business/Program name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  programLink: z.string().min(1, 'Program link is required'),
  intakeFormLink: z.string().url().optional().or(z.literal('')),
  needIntakeForm: z.enum(['yes', 'no']),
  faqDocument: z.string().min(1, 'FAQ document or link is required'),
  customResource: z.string().optional(),
  emailTone: z.enum(['professional', 'friendly', 'motivational']),
  upcomingEvents: z.string().optional(),
  emailSignature: z.string().min(1, 'Email signature is required'),
  questionHandling: z.enum(['forward', 'flag', 'other']),
  otherHandling: z.string().optional(),
})

type QuestionnaireForm = z.infer<typeof questionnaireSchema>

const questions = [
  {
    id: 'phone',
    title: "What's your phone number?",
    subtitle: "We'll use this to reach you if needed during setup",
    type: 'tel',
    icon: Phone,
    placeholder: 'Phone Number',
    required: true
  },
  {
    id: 'businessName',
    title: "What's your business or program name?",
    subtitle: "This helps us personalize your onboarding experience",
    type: 'text',
    icon: Building,
    placeholder: 'Business Name',
    required: true
  },
  {
    id: 'programLink',
    title: "What's your program or course link?",
    subtitle: "This is where your clients will access the content",
    type: 'url',
    icon: LinkIcon,
    placeholder: 'Program Link',
    required: true
  },
  {
    id: 'needIntakeForm',
    title: "Do you need us to create an intake form?",
    subtitle: "We can build a custom intake form for your clients",
    type: 'radio',
    icon: FileText,
    options: [
      { value: 'yes', label: 'Yes, create an intake form for me' },
      { value: 'no', label: 'No, I already have one' }
    ],
    required: true
  },
  {
    id: 'intakeFormLink',
    title: "What's your existing intake form link?",
    subtitle: "Only fill this if you already have an intake form",
    type: 'url',
    icon: LinkIcon,
    placeholder: 'Intake Form Link',
    required: false,
    conditional: { field: 'needIntakeForm', value: 'no' }
  },
  {
    id: 'faqDocument',
    title: "Share your FAQ document or key information",
    subtitle: "This helps us answer common client questions",
    type: 'textarea',
    icon: FileText,
    placeholder: 'FAQ Content or Link',
    required: true
  },
  {
    id: 'emailTone',
    title: "What tone should we use in client emails?",
    subtitle: "Choose the style that matches your brand",
    type: 'radio',
    icon: Palette,
    options: [
      { value: 'professional', label: 'Professional & formal' },
      { value: 'friendly', label: 'Friendly & approachable' },
      { value: 'motivational', label: 'Motivational & inspiring' }
    ],
    required: true
  },
  {
    id: 'upcomingEvents',
    title: "Any upcoming events or deadlines?",
    subtitle: "Optional: Let us know about important dates",
    type: 'textarea',
    icon: Calendar,
    placeholder: 'Upcoming Events',
    required: false
  },
  {
    id: 'emailSignature',
    title: "What email signature should we use?",
    subtitle: "This will appear at the end of all client emails",
    type: 'textarea',
    icon: Signature,
    placeholder: 'Email Signature',
    required: true
  },
  {
    id: 'questionHandling',
    title: "How should we handle client questions?",
    subtitle: "Choose your preferred communication protocol",
    type: 'radio',
    icon: MessageSquare,
    options: [
      { value: 'forward', label: 'Forward all questions to me' },
      { value: 'flag', label: 'Flag urgent questions only' },
      { value: 'other', label: 'Other (please specify)' }
    ],
    required: true
  },
  {
    id: 'otherHandling',
    title: "Please specify your preferred handling method",
    subtitle: "Describe how you'd like us to handle client questions",
    type: 'textarea',
    icon: Settings,
    placeholder: 'Communication Protocol',
    required: false,
    conditional: { field: 'questionHandling', value: 'other' }
  },
  {
    id: 'customResource',
    title: "Any additional resources or notes?",
    subtitle: "Optional: Share anything else that would help us",
    type: 'textarea',
    icon: FileText,
    placeholder: 'Additional Resources',
    required: false
  }
]

export default function TypeformQuestionnaire() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [initialData, setInitialData] = useState<any>(null)
  const [filteredQuestions, setFilteredQuestions] = useState(questions)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger
  } = useForm<QuestionnaireForm>({
    resolver: zodResolver(questionnaireSchema),
    mode: 'onChange',
  })

  // Load initial data and filter questions on mount
  useEffect(() => {
    const formData = localStorage.getItem('onboardingFormData')
    if (formData) {
      const data = JSON.parse(formData)
      setInitialData(data)

      // Pre-populate form with initial data
      if (data.name) setValue('fullName', data.name)
      if (data.email) setValue('email', data.email)

      // Filter out questions we already have answers for
      const filtered = questions.filter(q => {
        // Only exclude name and email - we collected them in the initial form
        // Phone and business name should be collected in questionnaire
        if (q.id === 'fullName' || q.id === 'email') return false

        return true
      })

      setFilteredQuestions(filtered)
    } else {
      // If no initial data, show all questions
      setFilteredQuestions(questions)
    }
  }, [setValue])

  const watchedValues = watch()
  const currentQuestion = filteredQuestions[currentStep]
  const progress = ((currentStep + 1) / filteredQuestions.length) * 100

  // Check if current question should be shown based on conditional logic
  const shouldShowQuestion = (question: typeof questions[0]) => {
    if (!question.conditional) return true
    const conditionValue = watchedValues[question.conditional.field as keyof QuestionnaireForm]
    return conditionValue === question.conditional.value
  }

  const getNextValidStep = (step: number) => {
    for (let i = step + 1; i < filteredQuestions.length; i++) {
      if (shouldShowQuestion(filteredQuestions[i])) return i
    }
    return filteredQuestions.length
  }

  const getPrevValidStep = (step: number) => {
    for (let i = step - 1; i >= 0; i--) {
      if (shouldShowQuestion(filteredQuestions[i])) return i
    }
    return 0
  }

  const handleNext = async () => {
    const isValid = await trigger(currentQuestion.id as keyof QuestionnaireForm)
    if (isValid) {
      const nextStep = getNextValidStep(currentStep)
      if (nextStep < filteredQuestions.length) {
        setCurrentStep(nextStep)
      } else {
        // All questions completed, submit form
        handleSubmit(onSubmit)()
      }
    }
  }

  const handlePrev = () => {
    const prevStep = getPrevValidStep(currentStep)
    setCurrentStep(prevStep)
  }

  const onSubmit = async (data: QuestionnaireForm) => {
    setIsSubmitting(true)
    try {
      // Get initial form data from localStorage
      const formData = localStorage.getItem('onboardingFormData')
      let initialData = {}
      if (formData) {
        initialData = JSON.parse(formData)
      }

      // Combine initial form data with questionnaire data
      const completeData = { ...initialData, ...data }

      // Submit questionnaire to API (saves to Supabase database)
      const response = await fetch('/api/questionnaire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(completeData),
      })

      if (response.ok) {
        const result = await response.json()

        // Store complete data for payment including the database intake_id
        localStorage.setItem('completeOnboardingData', JSON.stringify({
          ...completeData,
          intake_id: result.intake_id
        }))

        // Redirect to payment page
        window.location.href = '/payment'
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Submission failed')
      }

    } catch (error) {
      console.error('Submission error:', error)
      alert(`Something went wrong: ${error.message}. Please try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderQuestion = () => {
    const question = currentQuestion
    const Icon = question.icon
    const fieldName = question.id as keyof QuestionnaireForm
    const error = errors[fieldName]

    return (
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Icon className="w-8 h-8 text-primary" />
            <span className="text-sm text-muted-foreground">
              Question {currentStep + 1} of {filteredQuestions.filter(shouldShowQuestion).length}
            </span>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            {question.title}
          </h1>

          <p className="text-lg text-muted-foreground">
            {question.subtitle}
          </p>
        </div>

        <div className="space-y-4">
          {question.type === 'radio' && question.options && (
            <RadioGroup
              value={watchedValues[fieldName] as string}
              onValueChange={(value) => setValue(fieldName, value as any)}
              className="space-y-3"
            >
              {question.options.map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="text-base cursor-pointer flex-1">
                    {option.label}
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>
          )}

          {question.type === 'textarea' && (
            <Textarea
              {...register(fieldName)}
              placeholder={question.placeholder}
              className="min-h-[120px] text-lg resize-none border-2 focus:border-primary"
            />
          )}

          {['text', 'email', 'tel', 'url'].includes(question.type) && (
            <Input
              {...register(fieldName)}
              type={question.type}
              placeholder={question.placeholder}
              className="text-lg h-14 border-2 focus:border-primary"
            />
          )}

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-sm flex items-center gap-2"
            >
              {error.message}
            </motion.p>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <motion.div
          className="h-1 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="container max-w-3xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {currentStep < filteredQuestions.length ? (
            shouldShowQuestion(currentQuestion) ? (
              <div key={currentStep}>
                {renderQuestion()}

                {/* Navigation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex justify-between items-center mt-12"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                  >
                    {currentStep === filteredQuestions.length - 1 ? (
                      <>
                        {isSubmitting ? 'Submitting...' : 'Complete Setup'}
                        <CheckCircle className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Continue
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            ) : (
              // Skip conditional questions
              <div key={`skip-${currentStep}`}>
                {(() => {
                  // Use useEffect to handle the skip logic properly
                  setTimeout(() => {
                    setCurrentStep(getNextValidStep(currentStep))
                  }, 0)
                  return null
                })()}
              </div>
            )
          ) : (
            // Final submission
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h1 className="text-3xl font-bold">All set! 🎉</h1>
              <p className="text-lg text-muted-foreground">
                Your onboarding setup is complete. We'll be in touch within 24 hours.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}