"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,196,180,0.1) 0%, rgba(255,111,97,0.05) 50%, rgba(0,0,0,0) 70%)",
        }}
      ></motion.div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your healthcare staffing?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join Medlocum today and experience the future of healthcare staffing solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white transform transition-all hover:scale-105 hover:shadow-lg"
            >
              <Link href="https://hospital.medlocum.net">Get Started for Hospitals</Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white transform transition-all hover:scale-105 hover:shadow-lg"
            >
              <Link href="https://medic.medlocum.net">Join as a Medic</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

