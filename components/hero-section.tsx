"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView, useAnimation, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Stethoscope, Clipboard, Calendar, UserCheck, ArrowRight } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"

export function HeroSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { scrollY } = useScroll()
  const [typingText, setTypingText] = useState("")
  const [typingIndex, setTypingIndex] = useState(0)
  const fullText = "Healthcare Staffing"

  // Parallax effect for background elements
  const y1 = useTransform(scrollY, [0, 500], [0, 100])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.9])

  useEffect(() => {
    if (isInView) {
      controls.start("visible")

      // Typing effect
      const typingInterval = setInterval(() => {
        if (typingIndex < fullText.length) {
          setTypingText(fullText.substring(0, typingIndex + 1))
          setTypingIndex((prev) => prev + 1)
        } else {
          clearInterval(typingInterval)
        }
      }, 100)

      return () => clearInterval(typingInterval)
    }
  }, [controls, isInView, typingIndex])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  const floatingIconVariants = {
    initial: { y: 0, opacity: 0.2 },
    animate: (custom: number) => ({
      y: [0, -15, 0],
      opacity: [0.2, 0.5, 0.2],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
        delay: custom * 0.5,
      },
    }),
  }

  const blurVariants = {
    initial: { filter: "blur(10px)", opacity: 0 },
    animate: {
      filter: "blur(0px)",
      opacity: 1,
      transition: { duration: 0.8, delay: 0.2 },
    },
  }

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

  // Create particles on button click
  const createParticles = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    const container = document.createElement("div")
    container.style.position = "fixed"
    container.style.left = "0"
    container.style.top = "0"
    container.style.width = "100%"
    container.style.height = "100%"
    container.style.pointerEvents = "none"
    container.style.zIndex = "9999"
    document.body.appendChild(container)

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      const size = Math.random() * 10 + 5
      const angle = (i / 12) * 360
      const velocity = Math.random() * 50 + 50

      const tx = Math.cos(angle * (Math.PI / 180)) * velocity
      const ty = Math.sin(angle * (Math.PI / 180)) * velocity

      particle.style.width = `${size}px`
      particle.style.height = `${size}px`
      particle.style.left = `${x}px`
      particle.style.top = `${y}px`
      particle.style.backgroundColor = i % 2 === 0 ? "#3b82f6" : "#8b5cf6"
      particle.style.setProperty("--tx", `${tx}px`)
      particle.style.setProperty("--ty", `${ty}px`)

      particle.style.animation = "particle-animation 0.6s ease-out forwards"

      container.appendChild(particle)
    }

    // Remove container after animation completes
    setTimeout(() => {
      document.body.removeChild(container)
    }, 1000)
  }

  return (
    <section className="relative w-full min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 grid-pattern"></div>

      {/* Animated background blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/5 blob"
        style={{
          y: y1,
          x: mousePosition.x * -20,
        }}
      ></motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500/5 blob"
        style={{
          y: y2,
          x: mousePosition.x * 20,
        }}
      ></motion.div>

      {/* Floating Icons */}
      <motion.div
        className="absolute top-1/4 left-1/4 text-blue-500"
        variants={floatingIconVariants}
        initial="initial"
        animate="animate"
        custom={0}
        style={{ x: mousePosition.x * -30, y: mousePosition.y * -30 }}
      >
        <Stethoscope size={48} />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-1/4 text-purple-500"
        variants={floatingIconVariants}
        initial="initial"
        animate="animate"
        custom={1}
        style={{ x: mousePosition.x * 30, y: mousePosition.y * 30 }}
      >
        <Clipboard size={48} />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/6 text-blue-500"
        variants={floatingIconVariants}
        initial="initial"
        animate="animate"
        custom={2}
        style={{ x: mousePosition.x * -20, y: mousePosition.y * 20 }}
      >
        <Calendar size={48} />
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 right-1/6 text-purple-500"
        variants={floatingIconVariants}
        initial="initial"
        animate="animate"
        custom={3}
        style={{ x: mousePosition.x * 20, y: mousePosition.y * -20 }}
      >
        <UserCheck size={48} />
      </motion.div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="flex flex-col space-y-6"
          >
            <motion.div className="overflow-hidden" variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gradient">{typingText}</span>
                <span className="typing-cursor"></span>
                <span> Reimagined</span>
              </h1>
              <p className="text-2xl md:text-3xl mt-2 font-semibold text-blue-600">
                #1 Medical Locum App for Hospitals & Medics
              </p>
            </motion.div>

            <motion.p className="text-xl text-muted-foreground" variants={itemVariants}>
              Connecting hospitals with skilled medics through innovative technology. Our medical locum platform
              streamlines healthcare staffing for both facilities and professionals.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <MagneticButton>
                <Button
                  asChild
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white transform transition-all hover:scale-105 group relative overflow-hidden"
                  onClick={createParticles}
                >
                  <Link href="https://hospital.medlocum.net">
                    For Hospitals
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transform transition-all hover:scale-105 group relative overflow-hidden"
                  onClick={createParticles}
                >
                  <Link href="https://medic.medlocum.net">
                    For Medics
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div
            variants={blurVariants}
            initial="initial"
            animate="animate"
            className="relative"
            style={{ opacity, scale }}
          >
            <div className="relative h-[500px] md:h-[600px] perspective">
              <motion.div
                className="device-mockup w-full h-full bg-white"
                whileHover={{ rotateY: "-5deg" }}
                style={{
                  rotateY: mousePosition.x * 5,
                  rotateX: mousePosition.y * -5,
                }}
              >
                <div className="device-screen h-full">
                  <Image
                    src="/7317101.png?height=600&width=300&text=Medlocum"
                    alt="Medlocum App Interface"
                    fill
                    priority
                    className="object-cover"
                  />

                  <motion.div
                    className="absolute top-[20%] left-[10%] right-[10%] bg-white rounded-lg shadow-lg p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    style={{
                      x: mousePosition.x * -10,
                      y: mousePosition.y * -10 + 0,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <UserCheck className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">New Shift Available</h3>
                        <p className="text-xs text-muted-foreground">St. Luke's Hospital • 2 miles away</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute top-[45%] left-[10%] right-[10%] bg-white rounded-lg shadow-lg p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    style={{
                      x: mousePosition.x * 10,
                      y: mousePosition.y * 10 + 0,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Upcoming Shift</h3>
                        <p className="text-xs text-muted-foreground">Tomorrow • 8:00 AM - 4:00 PM</p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute top-[70%] left-[10%] right-[10%] bg-white rounded-lg shadow-lg p-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    style={{
                      x: mousePosition.x * -5,
                      y: mousePosition.y * -5 + 0,
                    }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full bg-green-500"></div>
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">Payment Received</h3>
                        <p className="text-xs text-muted-foreground">$750.00 • Processed</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500 relative">
                  <div className="absolute inset-0 bg-green-500 rounded-full pulse-ring"></div>
                </div>
                <span className="text-sm font-medium">500+ Active Medics</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="scroll-indicator"></div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#FFFFFF"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

