'use client'

import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import CheckoutButton from '@/components/checkout-button'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'

// OnboardPro brand colors that cycle through the aurora effect
const COLORS_TOP = ["#6C2CF8", "#AE47FF", "#FFB677", "#6B2FFB"];

export const OnboardProHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 8,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020824 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 text-foreground"
    >
      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        {/* Beta Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-6 bg-primary/10 border-primary/20 text-white text-sm px-4 py-2">
            ✨ White-Glove Onboarding Service
          </Badge>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl text-center text-4xl font-bold leading-tight text-white sm:text-6xl sm:leading-tight md:text-7xl md:leading-tight"
        >
          Transform Your Client Onboarding in{" "}
          <span className="text-accent font-bold">48 Hours</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="my-8 max-w-2xl text-center text-lg leading-relaxed text-gray-200 md:text-xl md:leading-relaxed"
        >
          Stop losing clients to poor first impressions. Our concierge team creates
          premium onboarding experiences that convert and retain.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <CheckoutButton
            text="Start Your 48-Hour Transformation"
            size="lg"
            className="text-lg px-8 py-6 rounded-full btn-glow text-white"
          />
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-6 text-sm text-gray-300"
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1,2,3,4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background"
                />
              ))}
            </div>
            <span>500+ coaches trust us</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <span>4.9/5 rating</span>
          </div>
        </motion.div>
      </div>

      {/* Starfield Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};