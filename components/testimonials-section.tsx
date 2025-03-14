"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const testimonials = [
    {
      quote: "Medlocum saved us hours of staffing headaches! The automated matching system is incredibly accurate.",
      author: "Dr. Jane K.",
      role: "Hospital Admin",
    },
    {
      quote: "I found my perfect shift in minutes! The app is intuitive and makes managing my schedule so much easier.",
      author: "Nurse Alex M.",
      role: "Registered Nurse",
    },
    {
      quote:
        "The matching system is a game-changer. We've reduced our staffing gaps by 70% since implementing Medlocum.",
      author: "HR Manager",
      role: "St. Luke's Hospital",
    },
  ]

  const next = () => {
    setCurrent((current + 1) % testimonials.length)
    setAutoplay(false)
  }

  const prev = () => {
    setCurrent((current - 1 + testimonials.length) % testimonials.length)
    setAutoplay(false)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [current, autoplay, testimonials.length])

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what healthcare professionals and administrators are saying about
            Medlocum.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative h-[300px] md:h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Card className="h-full border-none shadow-lg bg-white overflow-hidden">
                  <CardContent className="flex flex-col justify-center h-full p-8 relative">
                    <Quote className="absolute top-6 left-6 h-12 w-12 text-primary/10" />
                    <blockquote className="text-xl md:text-2xl font-medium text-center mb-6 relative z-10">
                      "{testimonials[current].quote}"
                    </blockquote>
                    <div className="text-center">
                      <p className="font-bold">{testimonials[current].author}</p>
                      <p className="text-muted-foreground">{testimonials[current].role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full hover:bg-primary/10 hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrent(index)
                    setAutoplay(false)
                  }}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    current === index ? "bg-primary w-6" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full hover:bg-primary/10 hover:text-primary"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

