"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()

    const centerX = left + width / 2
    const centerY = top + height / 2

    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    // Adjust the magnetic pull strength
    const magneticPull = 0.4

    setPosition({
      x: distanceX * magneticPull,
      y: distanceY * magneticPull,
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const handleClick = () => {
    // Create particle effect
    if (!buttonRef.current) return

    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    createParticles(centerX, centerY)

    if (onClick) onClick()
  }

  const createParticles = (x: number, y: number) => {
    const particleCount = 12
    const container = document.createElement("div")
    container.style.position = "fixed"
    container.style.left = "0"
    container.style.top = "0"
    container.style.width = "100%"
    container.style.height = "100%"
    container.style.pointerEvents = "none"
    container.style.zIndex = "9999"
    document.body.appendChild(container)

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      const size = Math.random() * 10 + 5
      const angle = (i / particleCount) * 360
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
    <motion.div
      ref={buttonRef}
      className={`magnetic-button ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      {children}
    </motion.div>
  )
}

