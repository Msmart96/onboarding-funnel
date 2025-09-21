'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Zap, Users, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import CheckoutButton from '@/components/checkout-button'
import { OnboardProHero } from '@/components/ui/futuristic-hero-section'

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Navigation - positioned over the hero */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-gradient"
          >
            OnboardPro
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              variant="outline"
              className="glass border-white/20 hover:bg-white/10"
              onClick={() => window.open('mailto:support@onboardpro.com', '_blank')}
            >
              Support
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Full Screen Hero Section */}
      <OnboardProHero />

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Coaches Choose <span className="text-gradient">OnboardPro</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our concierge team handles everything so you can focus on what you do best - coaching.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-8 h-8" />,
                title: "48-Hour Setup",
                description: "From questionnaire to live onboarding - we make it happen fast."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Dedicated VA Team",
                description: "Your personal onboarding specialists handle every client."
              },
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Save 8+ Hours Weekly",
                description: "Stop manually onboarding clients and focus on growing your business."
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card p-8 h-full hover:bg-white/8 transition-all duration-300">
                  <div className="text-primary mb-4">{benefit.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground">Three simple steps to transform your onboarding</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Sign Up & Pay",
                description: "Complete your purchase and get instant access to our onboarding questionnaire."
              },
              {
                step: "02",
                title: "Share Your Program",
                description: "Upload your materials and tell us about your coaching program in our detailed form."
              },
              {
                step: "03",
                title: "We Handle Everything",
                description: "Our VA team creates your SOP and starts onboarding your clients within 48 hours."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-primary/20 mb-4">{step.step}</div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-8 h-px bg-gradient-to-r from-primary to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold">
              Ready to <span className="text-gradient">Transform</span> Your
              <br />Client Onboarding?
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join 500+ coaches who&apos;ve eliminated onboarding headaches and created premium experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CheckoutButton
                size="lg"
                className="text-lg px-12 py-6 rounded-full"
                text="Let's Onboard Your Clients in 48 Hours"
              />
            </div>

            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>48-hour guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span>Full support included</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
