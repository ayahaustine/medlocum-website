"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function CursorEffects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorActive, setCursorActive] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseDown = () => setCursorActive(true)
    const handleMouseUp = () => setCursorActive(false)

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
        setCursorActive(true)
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
        setCursorActive(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    document.querySelectorAll("button, a").forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter as EventListener)
      element.addEventListener("mouseleave", handleMouseLeave as EventListener)
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)

      document.querySelectorAll("button, a").forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter as EventListener)
        element.removeEventListener("mouseleave", handleMouseLeave as EventListener)
      })
    }
  }, [])

  // Only show on desktop
  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    return null
  }

  return (
    <>
      <motion.div
        className="cursor-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          opacity: 1,
          scale: cursorActive ? 1.2 : 1,
        }}
      />
      <motion.div
        className={`cursor-dot ${cursorActive ? "cursor-active" : ""}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        animate={{
          scale: cursorActive ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />
    </>
  )
}

