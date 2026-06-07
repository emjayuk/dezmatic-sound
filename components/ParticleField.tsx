'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  speed: number
  opacity: number
}

const COLORS = ['#4DB8E8', '#F5A623']

function resetParticle(p: Particle, w: number, h: number, atBottom = true) {
  p.x = Math.random() * w
  p.y = atBottom ? h + Math.random() * 20 : Math.random() * h
  p.radius = 1.5 + Math.random() * 1.5
  p.color = COLORS[Math.floor(Math.random() * COLORS.length)]
  p.speed = 0.25 + Math.random() * 0.5
  p.opacity = atBottom ? 0 : Math.random() * 0.35
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number

    const setSize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    setSize()

    const ro = new ResizeObserver(setSize)
    ro.observe(canvas)

    const particles: Particle[] = Array.from({ length: 60 }, () => {
      const p: Particle = { x: 0, y: 0, radius: 0, color: '', speed: 0, opacity: 0 }
      resetParticle(p, canvas.width, canvas.height, false)
      return p
    })

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        ctx.save()
        ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
        ctx.restore()

        p.y -= p.speed

        // Fade in when near bottom, fade out when near top
        if (p.y > canvas.height * 0.75) {
          p.opacity = Math.min(p.opacity + 0.006, 0.4)
        } else if (p.y < canvas.height * 0.55) {
          p.opacity -= 0.0012
        }

        if (p.y < -p.radius || p.opacity <= 0) {
          resetParticle(p, canvas.width, canvas.height, true)
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
