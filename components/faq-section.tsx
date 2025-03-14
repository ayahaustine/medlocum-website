"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const faqs = [
    {
      question: "How does Medlocum work for hospitals?",
      answer:
        "Medlocum allows hospitals to post shifts, manage staff, and find qualified medical professionals through our automated matching system. Our platform streamlines the entire staffing process, saving time and resources. The Hospital App provides real-time availability tracking, comprehensive dashboards, and automated matching to help you find the perfect medics for your needs.",
    },
    {
      question: "How does Medlocum work for medical professionals?",
      answer:
        "Medical professionals can use Medlocum to find shifts that match their skills, availability, and location preferences. Our platform offers one-click applications, enhanced profile visibility, and an integrated calendar for schedule management. The Medic App helps you take control of your medical career with our intuitive platform.",
    },
    {
      question: "Is Medlocum free to use?",
      answer:
        "Yes, both the Hospital App and Medic App are free to download and use. Medlocum charges a small service fee only when a successful match is made between a hospital and a medical professional. This ensures that our platform remains accessible to all healthcare providers and medical professionals.",
    },
    {
      question: "What types of medical professionals can use Medlocum?",
      answer:
        "Medlocum supports a wide range of medical professionals including doctors, nurses, physician assistants, nurse practitioners, and other specialized healthcare providers looking for locum tenens opportunities. Our platform is designed to accommodate various medical specialties and skill sets.",
    },
    {
      question: "How does the matching system work?",
      answer:
        "Our advanced matching system uses AI and machine learning to connect hospitals with the most suitable medical professionals based on skills, qualifications, availability, location, and preferences. This ensures that both parties find the perfect match for their needs, saving time and improving satisfaction.",
    },
    {
      question: "Is my data secure on Medlocum?",
      answer:
        "Absolutely. We take data security and privacy very seriously. Medlocum employs industry-leading encryption and security measures to protect all user data. We are fully compliant with healthcare data regulations and never share your information without your explicit consent.",
    },
  ]

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Medlocum's healthcare staffing platform for hospitals and medical
            professionals.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="border rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50 transition-all">
                    <span className="text-left font-medium">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-muted-foreground">{faq.answer}</AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}

