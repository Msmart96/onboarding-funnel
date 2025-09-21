'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Clock, FileText, Calendar, ArrowRight, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export default function NextStepsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gradient">OnboardPro</div>
            <Badge className="bg-accent/10 text-accent border-accent/20">
              ✅ Payment Confirmed
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
            Welcome to <span className="text-gradient">OnboardPro</span>!
          </h1>

          <p className="text-xl text-muted-foreground mb-6">
            Thank you for your purchase. Your premium onboarding service is now active.
          </p>

          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-primary font-medium">Your dedicated VA team has been notified</span>
          </div>
        </motion.div>

        {/* Progress Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="glass-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">Your Setup Progress</h2>
              <p className="text-muted-foreground">
                Complete these steps to activate your onboarding service
              </p>
            </div>

            <div className="space-y-6">
              {/* Step 1 - Completed */}
              <div className="flex items-center gap-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-background" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-accent">Payment Confirmed</h3>
                  <p className="text-sm text-muted-foreground">Your onboarding service is now active</p>
                </div>
              </div>

              {/* Step 2 - Current */}
              <div className="flex items-center gap-4 p-4 border-2 border-primary/30 bg-primary/5 rounded-lg">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">Complete Your Questionnaire</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Share your program details so we can create your custom onboarding
                  </p>
                  <Button
                    className="bg-primary-gradient hover:opacity-90 btn-glow"
                    onClick={() => window.location.href = '/questionnaire'}
                  >
                    Start Questionnaire
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Must complete within 48 hours
                </Badge>
              </div>

              {/* Step 3 - Pending */}
              <div className="flex items-center gap-4 p-4 border border-muted/30 rounded-lg opacity-60">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">VA Team Setup</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team creates your SOP and trains your dedicated VA
                  </p>
                </div>
              </div>

              {/* Step 4 - Pending */}
              <div className="flex items-center gap-4 p-4 border border-muted/30 rounded-lg opacity-60">
                <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Start Onboarding Clients</h3>
                  <p className="text-sm text-muted-foreground">
                    Your VA begins onboarding your clients with the premium experience
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">25% Complete</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
          </Card>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <Card className="glass-card p-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Your <span className="text-gradient">48-Hour</span> Timeline
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Next 24 Hours</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Complete your questionnaire</li>
                      <li>• Upload your program materials</li>
                      <li>• Receive confirmation email</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Hours 24-48</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Our team creates your SOP</li>
                      <li>• VA training and briefing</li>
                      <li>• Email templates prepared</li>
                      <li>• Ready to onboard clients!</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-muted/20 rounded-lg p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  What to Expect
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Welcome email with questionnaire link</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>24-hour reminder if questionnaire incomplete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Setup completion confirmation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    <span>Introduction to your dedicated VA</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Support & Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <Card className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              Need Help?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our support team is here to help you get set up quickly.
            </p>
            <Button variant="outline" className="glass border-white/20 w-full">
              Contact Support
            </Button>
          </Card>

          <Card className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-accent" />
              Questions About Your Program?
            </h3>
            <p className="text-muted-foreground mb-4">
              Schedule a quick call to discuss your specific onboarding needs.
            </p>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground w-full">
              Schedule Call
            </Button>
          </Card>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <Card className="glass-card p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">
              Watch: How Your Onboarding Will Work
            </h3>
            <p className="text-muted-foreground mb-6">
              See exactly how we&apos;ll transform your client onboarding experience
            </p>

            {/* Video Placeholder */}
            <div className="aspect-video bg-muted/20 rounded-lg flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <div className="w-0 h-0 border-l-[10px] border-l-primary-foreground border-y-[6px] border-y-transparent ml-1" />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              3-minute overview of your premium onboarding process
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}