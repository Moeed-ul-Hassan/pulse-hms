'use client'

import { useState, useEffect } from 'react'

interface WatermarkProps {
  text?: string
  opacity?: number
  fontSize?: string
  color?: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}

export default function Watermark({
  text = "Built by Team @The Legends",
  opacity = 0.1,
  fontSize = "14px",
  color = "#6B7280",
  position = "bottom-right",
  className = ""
}: WatermarkProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show watermark after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4'
      case 'top-right':
        return 'top-4 right-4'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'bottom-right':
        return 'bottom-4 right-4'
      default:
        return 'bottom-4 right-4'
    }
  }

  return (
    <div
      className={`fixed pointer-events-none z-50 transition-opacity duration-1000 ${getPositionClasses()} ${className}`}
      style={{
        opacity: isVisible ? opacity : 0,
        fontSize,
        color,
        fontFamily: 'monospace',
        fontWeight: '500',
        textShadow: '0 1px 2px rgba(0,0,0,0.1)',
        transform: 'rotate(-15deg)',
        transformOrigin: 'center'
      }}
    >
      <div className="flex items-center space-x-1">
        <span className="text-xs">⚡</span>
        <span>{text}</span>
        <span className="text-xs">⚡</span>
      </div>
    </div>
  )
} 