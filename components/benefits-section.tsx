"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion"
import { Clock, DollarSign, Shield, Users, CheckCircle, BarChart } from "lucide-react"

export function BenefitsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const controls = useAnimation()
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      // Calculate mouse position as percentage of window
      const xPos = (clientX / windowWidth - 0.5) * 2 // -1 to 1
      const yPos = (clientY / windowHeight - 0.5) * 2 // -1 to 1

      setMousePosition({ x: xPos, y: yPos })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const benefits = [
    {
      icon: <Clock className="h-10 w-10" />,
      title: "Save Time",
      description: "Reduce staffing time by up to 70% with our automated matching system.",
      forHospitals: "Quickly find qualified medics for urgent shifts.",
      forMedics: "Find and apply to shifts in minutes, not hours.",
      color: "blue",
      particles: ["⏱️", "⚡", "🔄"],
    },
    {
      icon: <DollarSign className="h-10 w-10" />,
      title: "Reduce Costs",
      description: "Lower recruitment costs and eliminate agency fees with direct connections.",
      forHospitals: "Save on traditional staffing agency fees.",
      forMedics: "Keep more of your earnings with our low-fee structure.",
      color: "green",
      particles: ["💰", "💵", "📉"],
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Ensure Quality",
      description: "All medical professionals are verified and credentialed for your peace of mind.",
      forHospitals: "Access pre-verified, qualified medical professionals.",
      forMedics: "Showcase your credentials to stand out to employers.",
      color: "purple",
      particles: ["🛡️", "✅", "🔒"],
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Expand Network",
      description: "Connect with a nationwide network of hospitals and medical professionals.",
      forHospitals: "Access a larger pool of qualified candidates.",
      forMedics: "Discover opportunities across multiple healthcare facilities.",
      color: "indigo",
      particles: ["🌐", "🔗", "👥"],
    },
    {
      icon: <CheckCircle className="h-10 w-10" />,
      title: "Improve Satisfaction",
      description: "Better matches lead to higher satisfaction for both parties.",
      forHospitals: "Reduce turnover with better-matched professionals.",
      forMedics: "Find shifts that align with your preferences and skills.",
      color: "pink",
      particles: ["😊", "👍", "⭐"],
    },
    {
      icon: <BarChart className="h-10 w-10" />,
      title: "Data Insights",
      description: "Gain valuable insights into staffing patterns and performance.",
      forHospitals: "Optimize staffing levels with data-driven decisions.",
      forMedics: "Track your work history and earnings over time.",
      color: "amber",
      particles: ["📊", "📈", "🔍"],
    },
  ]

  const getColorClass = (color: string, type: "bg" | "text" | "border") => {
    const colorMap: Record<string, Record<string, string>> = {
      blue: { bg: "bg-blue-500", text: "text-blue-500", border: "border-blue-500" },
      green: { bg: "bg-green-500", text: "text-green-500", border: "border-green-500" },
      purple: { bg: "bg-purple-500", text: "text-purple-500", border: "border-purple-500" },
      indigo: { bg: "bg-indigo-500", text: "text-indigo-500", border: "border-indigo-500" },
      pink: { bg: "bg-pink-500", text: "text-pink-500", border: "border-pink-500" },
      amber: { bg: "bg-amber-500", text: "text-amber-500", border: "border-amber-500" },
    }
    return colorMap[color][type]
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: i * 0.1,
      },
    }),
  }

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const particleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      rotate: Math.random() * 360,
      transition: {
        duration: 1.5,
        delay: i * 0.1,
      },
    }),
  }

  const createParticles = (index: number) => {
    return benefits[index].particles.map((emoji, i) => (
      <motion.div
        key={`particle-${index}-${i}`}
        className="absolute text-2xl pointer-events-none"
        variants={particleVariants}
        initial="initial"
        animate="animate"
        custom={i}
      >
        {emoji}
      </motion.div>
    ))
  }

  return (
    <section id="benefits" className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1, rotate: [0, 5, 0, -5, 0] } : { scale: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="inline-block mb-4"
          >
            <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-blue-50 text-blue-600">
              Why Choose Medlocum
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefits That Make a Difference</h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "80px" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"
          ></motion.div>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our innovative healthcare staffing platform offers unique benefits for both hospitals and medical
            professionals.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={itemVariants}
              className="relative"
              onMouseEnter={() => setHoveredBenefit(index)}
              onMouseLeave={() => setHoveredBenefit(null)}
              style={{
                perspective: "1000px",
              }}
            >
              <motion.div
                className={`bg-white rounded-lg p-6 shadow-md h-full relative overflow-hidden z-10`}
                whileHover={{
                  scale: 1.03,
                  rotateX: mousePosition.y * -5,
                  rotateY: mousePosition.x * 5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
              >
                {/* Background gradient */}
                <motion.div
                  className={`absolute inset-0 opacity-0 ${getColorClass(benefit.color, "bg")}`}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.05 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon with animation */}
                <motion.div
                  className={`mb-4 relative ${getColorClass(benefit.color, "text")}`}
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {benefit.icon}

                  {/* Animated ring around icon */}
                  <motion.div
                    className={`absolute inset-0 rounded-full ${getColorClass(benefit.color, "border")} border-2 opacity-0`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.5 }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  />
                </motion.div>

                {/* Title with animation */}
                <motion.h3
                  className="text-xl font-bold mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  {benefit.title}
                </motion.h3>

                {/* Description with animation */}
                <motion.p
                  className="text-muted-foreground mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                >
                  {benefit.description}
                </motion.p>

                {/* Divider with animation */}
                <motion.div
                  className="border-t border-gray-100 my-4"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                />

                {/* For Hospitals and For Medics sections */}
                <div className="space-y-2 mt-4">
                  <motion.div
                    className="flex items-start gap-2 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <motion.div
                      className={`min-w-[24px] h-6 flex items-center justify-center`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className={`w-2 h-2 rounded-full ${getColorClass(benefit.color, "bg")}`}
                        whileHover={{ scale: 1.5 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <p className="text-sm">
                      <span className="font-medium">For Hospitals:</span> {benefit.forHospitals}
                    </p>
                  </motion.div>

                  <motion.div
                    className="flex items-start gap-2 group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <motion.div
                      className={`min-w-[24px] h-6 flex items-center justify-center`}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full bg-purple-500"
                        whileHover={{ scale: 1.5 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                    <p className="text-sm">
                      <span className="font-medium">For Medics:</span> {benefit.forMedics}
                    </p>
                  </motion.div>
                </div>

                {/* Animated corner accent */}
                <motion.div
                  className={`absolute -bottom-2 -right-2 w-12 h-12 ${getColorClass(benefit.color, "bg")} opacity-20 rounded-tl-xl`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 0.2, rotate: 15 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* Particle effects on hover */}
              <AnimatePresence>
                {hoveredBenefit === index && (
                  <div className="absolute inset-0 pointer-events-none overflow-visible">{createParticles(index)}</div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          />
        </div>

        {/* Interactive call-to-action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium text-lg shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => (window.location.href = "#contact")}
          >
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            >
              Experience the Benefits
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

