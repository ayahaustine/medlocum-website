"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

export function TrustedBy() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const logos = [
    { name: "St. Luke's Hospital", delay: 0 },
    { name: "Nairobi Clinic", delay: 0.1 },
    { name: "Memorial Healthcare", delay: 0.2 },
    { name: "City Medical Center", delay: 0.3 },
    { name: "University Hospital", delay: 0.4 },
  ]

  return (
    <section className="py-12 border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-lg font-medium text-muted-foreground">Trusted by leading healthcare institutions</h3>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: logo.delay }}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div className="h-12 w-32 relative">
                <Image
                  src={`/placeholder.svg?height=48&width=128&text=${encodeURIComponent(logo.name)}`}
                  alt={logo.name}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

