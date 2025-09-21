'use client'

import { useState } from 'react'
import { ArrowRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
})

type CheckoutForm = z.infer<typeof checkoutSchema>

interface CheckoutButtonProps {
  text?: string
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

export default function CheckoutButton({
  text = "Start Onboarding Setup",
  size = "lg",
  className = ""
}: CheckoutButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: CheckoutForm) => {
    setIsLoading(true)

    try {
      // Store the form data in localStorage for the questionnaire
      localStorage.setItem('onboardingFormData', JSON.stringify(data))

      // Redirect to questionnaire instead of payment
      window.location.href = '/questionnaire'

    } catch (error) {
      console.error('Form submission error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const buttonClasses = `bg-primary-gradient hover:opacity-90 btn-glow ${className}`

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size={size}
          className={buttonClasses}
          onClick={() => setIsOpen(true)}
        >
          {text}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="glass-card border-white/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            Start Your Onboarding Setup
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full Name *</Label>
              <Input
                id="name"
                {...register('name')}
                className="glass border-white/20 text-white placeholder:text-gray-400"
                placeholder="Full Name"
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                className="glass border-white/20 text-white placeholder:text-gray-400"
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
          </div>


          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full bg-primary-gradient hover:opacity-90 btn-glow text-white"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin text-white" />
                <span className="text-white">Continuing...</span>
              </>
            ) : (
              <>
                <span className="text-white">Continue to Questionnaire</span>
                <ArrowRight className="w-4 h-4 ml-2 text-white" />
              </>
            )}
          </Button>

          <p className="text-xs text-gray-300 text-center">
            Next, we'll gather details about your program to customize your onboarding experience.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}