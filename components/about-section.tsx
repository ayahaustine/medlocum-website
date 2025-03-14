"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const timelineItems = [
    {
      year: "2023",
      title: "Founded",
      description: "Medlocum was established to revolutionize healthcare staffing.",
    },
    {
      year: "2024",
      title: "Launched Apps",
      description: "Released our Hospital and Medic applications to the market.",
    },
    {
      year: "2025",
      title: "Expanded Reach",
      description: "Now serving healthcare systems globally with innovative solutions.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Are</h2>
            <div className="relative h-1 w-0 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-6 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary"
              ></motion.div>
            </div>
            <p className="text-lg text-muted-foreground">
              At Medlocum, we're revolutionizing healthcare staffing. Our mission is to bridge the gap between hospitals
              and medics with innovative, reliable technology. Founded in 2023, we're proud to serve healthcare systems
              globally.
            </p>
          </motion.div>

          <div className="relative mt-20">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

            {/* Timeline items */}
            <div className="relative">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                  className={`flex items-center mb-16 last:mb-0 ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12"}`}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.2 }}
                      className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold z-10"
                    >
                      {item.year}
                    </motion.div>
                  </div>

                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-16"
          >
            <Button asChild className="bg-primary hover:bg-primary/90 group">
              <Link href="#contact">
                Learn More
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

