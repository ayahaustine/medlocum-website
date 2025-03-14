"use client"

import { useScroll, motion } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return <motion.div className="progress-bar" style={{ scaleX: scrollYProgress }} />
}

