"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FaqSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })


  const faqs = [
  {
    question: "How does Medlocum help hospitals manage staffing?",
    answer:
      "Medlocum empowers hospitals to post locum shifts, track real-time availability, and connect with qualified medics through our Hospital App (hospital.medlocum.net). Our automated matching system scores candidates based on skills (40%), availability (30%), location (20%), and ratings (10%), ensuring the perfect fit. Features like shift templates, comprehensive dashboards, and secure in-app messaging streamline operations, saving time and reducing staffing stress.",
  },
  {
    question: "How can medical professionals benefit from Medlocum?",
    answer:
      "Medlocum makes it easy for medics to find and apply to locum shifts that match their expertise and schedule via the Medic App (medic.medlocum.net). With one-click applications, GPS-based job searches, and a dynamic profile showcasing skills and availability, you’re in control. Integrated calendar tools and priority job alerts help you manage your career effortlessly and grow your opportunities.",
  },
  {
    question: "Is there a cost to use Medlocum?",
    answer:
      "The core features of both the Hospital App and Medic App are free to use, making Medlocum accessible to all. Hospitals can opt for tiered subscriptions (Basic, Pro, Enterprise) starting at 5,000 KES/month (~$40 USD) for advanced features like unlimited postings or AI-powered matching. Medics can access premium perks—like highlighted profiles or job application boosters—for as little as 100 KES (~$0.80 USD) per use. No hidden fees—just value when you need it.",
  },
  {
    question: "Who can use Medlocum as a medical professional?",
    answer:
      "Medlocum welcomes a diverse range of healthcare providers, including doctors, nurses, physician assistants, nurse practitioners, and specialists seeking locum opportunities. Whether you’re in emergency medicine, pediatrics, or surgery, our platform supports your skills and preferences, connecting you with hospitals that need your expertise.",
  },
  {
    question: "What powers the Medlocum matching system?",
    answer:
      "Our cutting-edge matching system leverages AI and machine learning to pair hospitals and medics efficiently. It analyzes skills, certifications, availability, location, and past performance to deliver highly compatible matches in real time. Hospitals see ranked candidates with compatibility scores, while medics get personalized job recommendations—ensuring faster placements and better outcomes.",
  },
  {
    question: "How does Medlocum keep my data safe?",
    answer:
      "Your privacy is our priority. Medlocum uses end-to-end encryption, GDPR-compliant storage, and real-time license verification via medical board APIs to safeguard your data. Whether it’s hospital credentials or medic profiles, we adhere to strict healthcare regulations and never share your information without consent. Secure, reliable, and trusted—always.",
  },
  {
    question: "How quickly can I get started with Medlocum?",
    answer:
      "Getting started is fast and simple. Hospitals can register with verified credentials and post shifts in minutes using the Hospital App. Medics can sign up with their professional details, upload certifications, and start applying to jobs instantly via the Medic App. With automated verification and intuitive tools, you’re up and running on March 14, 2025—or any day you join us!",
  },
];



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

