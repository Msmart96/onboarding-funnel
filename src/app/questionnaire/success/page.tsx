'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Clock, Mail, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function QuestionnaireSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gradient">OnboardPro</div>
            <Badge className="bg-accent/10 text-accent border-accent/20">
              ✅ Setup Complete
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-accent" />
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-gradient">Perfect!</span> Your Setup is Complete
          </h1>

          <p className="text-xl text-muted-foreground mb-6">
            Thank you for providing your program details. Our team is now preparing your premium onboarding experience.
          </p>

          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-primary font-medium">Your VA team has been notified and will begin setup</span>
          </div>
        </motion.div>

        {/* What Happens Next */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="glass-card p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              What Happens <span className="text-gradient">Next</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Next 4 Hours</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Our team reviews your program materials</li>
                      <li>• VA specialist assigned to your account</li>
                      <li>• Initial SOP draft created</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Within 24 Hours</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Email templates customized for your brand</li>
                      <li>• VA team trained on your specific requirements</li>
                      <li>• Quality assurance review completed</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Within 48 Hours</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Complete onboarding system ready</li>
                      <li>• Introduction to your dedicated VA</li>
                      <li>• First client onboarding can begin!</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-muted/20 rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  You'll Receive
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Confirmation email with timeline details</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>SOP preview for your review and approval</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>VA introduction with your team contact</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Go-live notification when ready to onboard clients</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm font-medium text-primary">
                    💫 VIP Support Available
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Need to make changes or have questions? Your premium support line is always available.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Card className="glass-card p-8">
            <h3 className="text-2xl font-semibold mb-4">
              Questions About Your Setup?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our concierge team is standing by to ensure your onboarding experience is perfect.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                className="glass border-white/20"
                onClick={() => window.location.href = 'mailto:support@onboardpro.com'}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Support
              </Button>

              <Button
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                onClick={() => window.location.href = 'tel:+1234567890'}
              >
                Schedule Priority Call
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Average response time: Under 2 hours during business hours
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}