"use client"

import type React from "react"

import { useEffect, useState } from "react"

export function FloatingElements() {
  const [elements, setElements] = useState<React.ReactNode[]>([])

  useEffect(() => {
    const newElements = []
    const count = 15

    for (let i = 0; i < count; i++) {
      const size = Math.random() * 60 + 20
      const left = Math.random() * 100
      const top = Math.random() * 100
      const delay = Math.random() * 5
      const duration = Math.random() * 10 + 15
      const tx1 = Math.random() * 200 - 100 + "%"
      const ty1 = Math.random() * 200 - 100 + "%"
      const tx2 = Math.random() * 200 - 100 + "%"
      const ty2 = Math.random() * 200 - 100 + "%"
      const tx3 = Math.random() * 200 - 100 + "%"
      const ty3 = Math.random() * 200 - 100 + "%"

      newElements.push(
        <div
          key={i}
          className="floating-element"
          style={
            {
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              opacity: Math.random() * 0.5 + 0.1,
              "--tx1": tx1,
              "--ty1": ty1,
              "--tx2": tx2,
              "--ty2": ty2,
              "--tx3": tx3,
              "--ty3": ty3,
            } as React.CSSProperties
          }
        />,
      )
    }

    setElements(newElements)
  }, [])

  return <div className="floating-elements">{elements}</div>
}

