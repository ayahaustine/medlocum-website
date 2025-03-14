"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

interface DataPoint {
  x: number
  y: number
}

export function InteractiveChart() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)
  const [data] = useState<DataPoint[]>(() => {
    // Generate some sample data
    return Array.from({ length: 12 }, (_, i) => ({
      x: i,
      y: Math.floor(Math.random() * 50) + 30,
    }))
  })

  const chartWidth = 300
  const chartHeight = 150
  const padding = 20
  const pointRadius = 4

  // Scale data to fit chart
  const xScale = (x: number) => (x / (data.length - 1)) * (chartWidth - padding * 2) + padding
  const yScale = (y: number) => chartHeight - ((y / 100) * (chartHeight - padding * 2) + padding)

  // Generate path for the line
  const linePath = data.map((point, i) => `${i === 0 ? "M" : "L"} ${xScale(point.x)} ${yScale(point.y)}`).join(" ")

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <svg width={chartWidth} height={chartHeight} className="overflow-visible">
        {/* X and Y axes */}
        <line
          x1={padding}
          y1={chartHeight - padding}
          x2={chartWidth - padding}
          y2={chartHeight - padding}
          stroke="#e2e8f0"
          strokeWidth={1}
        />
        <line x1={padding} y1={padding} x2={padding} y2={chartHeight - padding} stroke="#e2e8f0" strokeWidth={1} />

        {/* Line chart */}
        <motion.path
          d={linePath}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth={2}
          className="chart-line"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Area under the curve */}
        <motion.path
          d={`${linePath} L ${xScale(data[data.length - 1].x)} ${chartHeight - padding} L ${xScale(0)} ${chartHeight - padding} Z`}
          fill="url(#areaGradient)"
          opacity={0.2}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.2 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
        />

        {/* Data points */}
        {data.map((point, i) => (
          <motion.g
            key={i}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 1 + i * 0.05 }}
          >
            <motion.circle
              cx={xScale(point.x)}
              cy={yScale(point.y)}
              r={hoveredPoint === i ? pointRadius * 1.5 : pointRadius}
              fill={hoveredPoint === i ? "#3b82f6" : "#fff"}
              stroke="#3b82f6"
              strokeWidth={2}
              className="cursor-pointer transition-all duration-200"
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
              animate={{
                r: hoveredPoint === i ? pointRadius * 1.5 : pointRadius,
                fill: hoveredPoint === i ? "#3b82f6" : "#fff",
              }}
            />

            {hoveredPoint === i && (
              <g>
                <rect x={xScale(point.x) - 30} y={yScale(point.y) - 40} width={60} height={30} rx={5} fill="#3b82f6" />
                <text x={xScale(point.x)} y={yScale(point.y) - 20} textAnchor="middle" fill="#fff" fontSize={12}>
                  {point.y}%
                </text>
              </g>
            )}
          </motion.g>
        ))}

        {/* Gradients */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

