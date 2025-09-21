'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle, Loader2, CreditCard, Shield, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function PaymentPage() {
  const [customerData, setCustomerData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load customer data from localStorage
    const completeData = localStorage.getItem('completeOnboardingData')
    if (completeData) {
      setCustomerData(JSON.parse(completeData))
    } else {
      // If no data, redirect back to start
      window.location.href = '/'
    }
  }, [])

  const handlePayment = async () => {
    if (!customerData) return

    setIsLoading(true)
    try {
      // Create Stripe checkout session with all customer data
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: customerData.email,
          name: customerData.name,
          businessName: customerData.businessName
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      window.location.href = result.checkout_url

    } catch (error) {
      console.error('Payment error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const goBack = () => {
    window.location.href = '/questionnaire'
  }

  if (!customerData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={goBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Questionnaire
          </Button>

          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            </motion.div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gradient">
              Perfect! You're All Set
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Thank you for completing the questionnaire, <span className="text-foreground font-semibold">{customerData.name}</span>.
              Now let's finalize your premium onboarding setup.
            </p>
          </div>

          {/* Service Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Premium Onboarding Service</h2>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-accent">$497</div>
                    <div className="text-sm text-muted-foreground">One-time setup</div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-primary" />
                      <span>48-hour setup guarantee</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Dedicated VA team assignment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Custom SOP creation</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Automated client onboarding</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Email setup & automation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Ongoing support & optimization</span>
                    </div>
                  </div>
                </div>

                {/* Customer Info Summary */}
                <div className="bg-muted/20 rounded-lg p-4 space-y-2">
                  <h3 className="font-semibold text-foreground">Setup Details:</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div><span className="font-medium">Business:</span> {customerData.businessName}</div>
                    <div><span className="font-medium">Email:</span> {customerData.email}</div>
                    <div><span className="font-medium">Contact:</span> {customerData.name}</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Payment Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center space-y-6"
          >
            <Button
              onClick={handlePayment}
              disabled={isLoading}
              size="lg"
              className="bg-primary-gradient hover:opacity-90 btn-glow text-lg px-12 py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating secure checkout...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Complete Payment - $497
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              Secure payment powered by Stripe
            </div>

            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Use promotional code <span className="font-mono bg-muted px-2 py-1 rounded">LAUNCH497</span> at checkout for 100% off (limited time)
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}