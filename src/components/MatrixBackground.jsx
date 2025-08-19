import { useEffect, useRef, useState } from 'react'

export default function MatrixBackground() {
  const canvasRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Matrix characters
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+-=[]{}|;:,.<>?'
    const fontSize = 18
    const columns = Math.floor(canvas.width / fontSize)

    // Array to store the y position of each column
    const drops = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height / fontSize
    }

    // Mouse tracking
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)

    const draw = () => {
      // Create trailing effect with black background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text properties
      ctx.font = `${fontSize}px 'Courier New', monospace`
      ctx.textAlign = 'center'

      for (let i = 0; i < drops.length; i++) {
        // Calculate position
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Calculate distance from mouse
        const distance = Math.sqrt(
          Math.pow(mousePosition.x - x, 2) + Math.pow(mousePosition.y - y, 2)
        )

        // Color based on distance from mouse
        let color = '#00ff00'
        let alpha = 0.9

        if (distance < 120) {
          // Close to mouse - bright cyan
          color = '#00ffff'
          alpha = 1
          // Add glow effect
          ctx.shadowColor = '#00ffff'
          ctx.shadowBlur = 10
        } else if (distance < 250) {
          // Medium distance - green to cyan gradient
          const ratio = (250 - distance) / 130
          const green = Math.floor(255 * (1 - ratio * 0.3))
          const blue = Math.floor(255 * ratio)
          color = `rgb(0, ${green}, ${blue})`
          alpha = 0.9
          ctx.shadowColor = color
          ctx.shadowBlur = 5
        } else {
          // Far from mouse - bright green
          alpha = 0.7
          color = '#00ff00'
          ctx.shadowColor = '#00ff00'
          ctx.shadowBlur = 2
        }

        ctx.fillStyle = color
        ctx.globalAlpha = alpha

        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, x, y)

        // Reset shadow
        ctx.shadowBlur = 0

        // Reset drop to top randomly or when it reaches bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Move drop down
        drops[i] += 0.8
      }

      ctx.globalAlpha = 1
    }

    // Start with black background
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Animation loop
    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mousePosition.x, mousePosition.y])

  return (
    <canvas
      ref={canvasRef}
      className="matrix-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: '#000000'
      }}
    />
  )
}
