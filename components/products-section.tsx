"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Building2, UserRound, ArrowRight, Check } from "lucide-react"
import { InteractiveChart } from "@/components/interactive-chart"
import { MagneticButton } from "@/components/magnetic-button"

export function ProductsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Parallax and rotation effects
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 5])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -5])

  // Mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const featureItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: 0.2 + custom * 0.1,
        ease: "easeOut",
      },
    }),
  }

  // Create ripple effect on hover
  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ripple = document.createElement("div")
    ripple.className = "ripple"
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.backgroundColor = "rgba(59, 130, 246, 0.2)"

    card.appendChild(ripple)

    setTimeout(() => {
      card.removeChild(ripple)
    }, 600)
  }

  // Animated data for hospital dashboard
  const [staffingPercentage, setStaffingPercentage] = useState(80)

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setStaffingPercentage((prev) => {
          const newValue = prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3)
          return Math.min(Math.max(newValue, 70), 90) // Keep between 70-90%
        })
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [isInView])

  return (
    <section id="products" ref={ref} className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50"></div>

      {/* Background gradient blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-[30%] -left-[10%] w-[50%] h-[50%] bg-blue-100/30 rounded-full blur-3xl"
          style={{
            x: mousePosition.x * -30,
            y: mousePosition.y * -30,
          }}
        ></motion.div>
        <motion.div
          className="absolute -bottom-[30%] -right-[10%] w-[50%] h-[50%] bg-purple-100/30 rounded-full blur-3xl"
          style={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
          }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col items-center text-center mb-20"
        >
          <motion.div variants={itemVariants}>
            <motion.span
              className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-blue-50 text-blue-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Our Solutions
            </motion.span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Streamlined Healthcare Staffing</h2>
            <motion.div
              className="h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"
              animate={{ width: isInView ? "80px" : "0px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            ></motion.div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Innovative platforms designed to connect hospitals and medical professionals with unparalleled efficiency.
            </p>
          </motion.div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Hospital App */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-blue-100">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold">Hospital App</h3>
            </div>

            <p className="text-muted-foreground mb-6">
              Streamline your staffing operations with our comprehensive hospital platform. Post shifts, manage staff,
              and find the perfect medics for your needs.
            </p>

            <div className="space-y-4 mb-8">
              <motion.div
                custom={0}
                variants={featureItemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <div className="mt-1 p-1 rounded-full bg-green-100">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Automated Matching System</h4>
                  <p className="text-sm text-muted-foreground">
                    Find the perfect medics based on skills, availability, and location.
                  </p>
                </div>
              </motion.div>

              <motion.div
                custom={1}
                variants={featureItemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <div className="mt-1 p-1 rounded-full bg-green-100">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Real-time Availability Tracking</h4>
                  <p className="text-sm text-muted-foreground">See who's available when you need them most.</p>
                </div>
              </motion.div>

              <motion.div
                custom={2}
                variants={featureItemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <div className="mt-1 p-1 rounded-full bg-green-100">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Comprehensive Dashboard</h4>
                  <p className="text-sm text-muted-foreground">
                    Manage all your staffing needs from one intuitive interface.
                  </p>
                </div>
              </motion.div>
            </div>

            <MagneticButton>
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white group">
                <Link href="https://hospital.medlocum.net">
                  Explore Hospital App
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div style={{ y: y1, rotate: rotate1 }} className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative mx-auto max-w-md hover-3d"
              style={{
                perspective: "1000px",
                rotateX: mousePosition.y * -5,
                rotateY: mousePosition.x * 5,
              }}
              onMouseMove={createRipple}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur-xl opacity-20 transform -rotate-3"></div>

              <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Building2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="font-medium">Hospital Dashboard</span>
                    </div>
                    <div className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                      Online
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Current Staffing</h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Emergency Dept.</span>
                        <motion.span
                          className="font-medium"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          {staffingPercentage / 10}/10 positions filled
                        </motion.span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                        <motion.div
                          className="h-2 bg-blue-500 rounded-full"
                          animate={{ width: `${staffingPercentage}%` }}
                          transition={{ duration: 1 }}
                        ></motion.div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Open Shifts</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span>Registered Nurse</span>
                          <motion.span
                            className="text-blue-600"
                            animate={{
                              opacity: [0.7, 1, 0.7],
                              scale: [1, 1.05, 1],
                            }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                          >
                            3 applicants
                          </motion.span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Emergency Physician</span>
                          <motion.span
                            className="text-blue-600"
                            animate={{
                              opacity: [0.7, 1, 0.7],
                              scale: [1, 1.05, 1],
                            }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                          >
                            5 applicants
                          </motion.span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium mb-2">Weekly Staffing Trends</h4>
                    <InteractiveChart />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Medic App */}
          <motion.div style={{ y: y2, rotate: rotate2 }} className="order-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative mx-auto max-w-[280px] hover-3d"
              style={{
                perspective: "1000px",
                rotateX: mousePosition.y * 5,
                rotateY: mousePosition.x * -5,
              }}
              onMouseMove={createRipple}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-[2.5rem] blur-xl opacity-20 transform rotate-3"></div>

              <div className="relative w-[280px] h-[580px] rounded-[2.5rem] border-[14px] border-gray-900 bg-white overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-900 rounded-b-xl"></div>
                <div className="h-full overflow-hidden">
                  <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>

                  <div className="p-4">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <UserRound className="h-4 w-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-sm">Medic App</span>
                      </div>
                    </div>

                    <motion.div
                      className="bg-purple-50 rounded-lg p-4 mb-4"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h4 className="text-sm font-medium mb-2">Available Shifts</h4>
                      <p className="text-xs text-muted-foreground mb-2">Based on your preferences</p>

                      <div className="space-y-3">
                        <motion.div
                          className="bg-white p-3 rounded-lg shadow-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium text-sm">St. Luke's Hospital</h5>
                              <p className="text-xs text-muted-foreground">Emergency Dept • 2 miles away</p>
                            </div>
                            <motion.span
                              className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full"
                              whileHover={{ scale: 1.1 }}
                              animate={{ y: [0, -3, 0] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            >
                              $75/hr
                            </motion.span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">Mar 15 • 8AM-4PM</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs px-2 text-purple-600 border-purple-600 shimmer"
                            >
                              Apply
                            </Button>
                          </div>
                        </motion.div>

                        <motion.div
                          className="bg-white p-3 rounded-lg shadow-sm"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ delay: 0.1 }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium text-sm">City Medical Center</h5>
                              <p className="text-xs text-muted-foreground">ICU • 5 miles away</p>
                            </div>
                            <motion.span
                              className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full"
                              whileHover={{ scale: 1.1 }}
                              animate={{ y: [0, -3, 0] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                            >
                              $82/hr
                            </motion.span>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-muted-foreground">Mar 16 • 7PM-7AM</span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 text-xs px-2 text-purple-600 border-purple-600 shimmer"
                            >
                              Apply
                            </Button>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="bg-gray-50 rounded-lg p-4"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h4 className="text-sm font-medium mb-2">Your Schedule</h4>
                      <div className="relative">
                        <Image
                          src="/placeholder.svg?height=150&width=230&text=Weekly+Calendar"
                          alt="Weekly Calendar"
                          width={230}
                          height={150}
                          className="w-full h-auto rounded-lg mb-2"
                        />
                        <motion.div
                          className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                        <motion.div
                          className="absolute top-1/2 right-1/3 w-2 h-2 bg-blue-500 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                        />
                        <motion.div
                          className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-green-500 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">This Week</span>
                        <motion.span
                          className="text-xs font-medium"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          3 shifts • 24 hours
                        </motion.span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="order-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-purple-100">
                <UserRound className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold">Medic App</h3>
            </div>

            <p className="text-muted-foreground mb-6">
              Take control of your medical career with our intuitive medic platform. Find shifts, manage your schedule,
              and grow your professional network.
            </p>

            <div className="space-y-4 mb-8">
              <motion.div
                custom={0}
                variants={featureItemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <div className="mt-1 p-1 rounded-full bg-green-100">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">One-Click Applications</h4>
                  <p className="text-sm text-muted-foreground">
                    Apply to shifts instantly with your pre-filled profile.
                  </p>
                </div>
              </motion.div>

              <motion.div
                custom={1}
                variants={featureItemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <div className="mt-1 p-1 rounded-full bg-green-100">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Enhanced Profile Visibility</h4>
                  <p className="text-sm text-muted-foreground">
                    Stand out to hospitals with your skills and experience.
                  </p>
                </div>
              </motion.div>

              <motion.div
                custom={2}
                variants={featureItemVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <div className="mt-1 p-1 rounded-full bg-green-100">
                  <Check className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-medium">Integrated Calendar</h4>
                  <p className="text-sm text-muted-foreground">Manage your schedule and avoid conflicts.</p>
                </div>
              </motion.div>
            </div>

            <MagneticButton>
              <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white group">
                <Link href="https://medic.medlocum.net">
                  Discover Medic App
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

