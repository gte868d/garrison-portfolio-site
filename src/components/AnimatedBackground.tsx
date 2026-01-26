'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)

    // Animation variables
    let time = 0
    const shapes: Array<{
      x: number
      y: number
      size: number
      rotationX: number
      rotationY: number
      rotationZ: number
      speed: number
      breathSpeed: number
      color: string
    }> = []

    // Create floating geometric shapes
    const createShapes = () => {
      const colors = [
        'rgba(127, 184, 0, 0.15)', // Brighter green - was 0.03
        'rgba(127, 184, 0, 0.20)', // Brighter green - was 0.05
        'rgba(163, 217, 0, 0.12)', // Brighter green - was 0.02
        'rgba(42, 51, 41, 0.10)',  // Slightly brighter - was 0.04
      ]

      // Create 5-7 shapes scattered across the viewport
      const shapeCount = 6
      for (let i = 0; i < shapeCount; i++) {
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 100 + Math.random() * 200,
          rotationX: Math.random() * Math.PI * 2,
          rotationY: Math.random() * Math.PI * 2,
          rotationZ: Math.random() * Math.PI * 2,
          speed: 0.0002 + Math.random() * 0.0003,
          breathSpeed: 0.001 + Math.random() * 0.001,
          color: colors[Math.floor(Math.random() * colors.length)]
        })
      }
    }
    createShapes()

    // Draw a 3D cube projection
    const drawCube = (
      x: number, 
      y: number, 
      size: number, 
      rotX: number, 
      rotY: number, 
      rotZ: number,
      color: string,
      breathScale: number
    ) => {
      const scaledSize = size * breathScale

      // Define cube vertices
      const vertices = [
        [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], // Front face
        [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]      // Back face
      ]

      // Rotate and project vertices
      const projected = vertices.map(([vx, vy, vz]) => {
        // Apply rotations
        let x1 = vx
        let y1 = vy * Math.cos(rotX) - vz * Math.sin(rotX)
        let z1 = vy * Math.sin(rotX) + vz * Math.cos(rotX)

        let x2 = x1 * Math.cos(rotY) + z1 * Math.sin(rotY)
        let y2 = y1
        let z2 = -x1 * Math.sin(rotY) + z1 * Math.cos(rotY)

        let x3 = x2 * Math.cos(rotZ) - y2 * Math.sin(rotZ)
        let y3 = x2 * Math.sin(rotZ) + y2 * Math.cos(rotZ)

        // Project to 2D with perspective
        const perspective = 400
        const scale = perspective / (perspective + z2 * 100)

        return {
          x: x + x3 * scaledSize * scale,
          y: y + y3 * scaledSize * scale,
          z: z2
        }
      })

      // Draw edges (only front-facing ones based on z-depth)
      const edges = [
        [0, 1], [1, 2], [2, 3], [3, 0], // Front face
        [4, 5], [5, 6], [6, 7], [7, 4], // Back face
        [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting edges
      ]

      ctx.strokeStyle = color
      ctx.lineWidth = 2.5  // Was 1.5 - now thicker
      ctx.lineCap = 'round'

      edges.forEach(([start, end]) => {
        const p1 = projected[start]
        const p2 = projected[end]
        
        // Only draw if edge is somewhat forward-facing
        if (p1.z < 1 || p2.z < 1) {
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      time += 0.01

      shapes.forEach(shape => {
        // Update rotations (very slow, gentle)
        shape.rotationX += shape.speed
        shape.rotationY += shape.speed * 0.7
        shape.rotationZ += shape.speed * 0.5

        // Breathing effect (gentle scale pulse)
        const breathScale = 1 + Math.sin(time * shape.breathSpeed) * 0.1

        // Gentle floating motion
        const floatY = Math.sin(time * 0.5 + shape.x) * 20
        const floatX = Math.cos(time * 0.3 + shape.y) * 15

        drawCube(
          shape.x + floatX,
          shape.y + floatY,
          shape.size,
          shape.rotationX,
          shape.rotationY,
          shape.rotationZ,
          shape.color,
          breathScale
        )
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-80"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
