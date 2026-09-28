import { useEffect, useState } from 'react'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [trailing, setTrailing] = useState({ x: -100, y: -100 })
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers and no reduced-motion preference
    const mediaHover = window.matchMedia('(hover: hover) and (pointer: fine)')
    const mediaReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!mediaHover.matches || mediaReduced.matches) return

    let animationFrameId: number

    const handleMouseMove = (event: MouseEvent) => {
      setVisible(true)
      setPosition({ x: event.clientX, y: event.clientY })

      const target = event.target as HTMLElement | null
      const isInteractive = Boolean(
        target?.closest('a, button, input, textarea, select, [role="button"], .interactive')
      )
      setHovered(isInteractive)
    }

    const handleMouseLeave = () => setVisible(false)
    const handleMouseEnter = () => setVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Smooth trailing animation loop
    const followCursor = () => {
      setTrailing((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.22,
        y: prev.y + (position.y - prev.y) * 0.22,
      }))
      animationFrameId = requestAnimationFrame(followCursor)
    }
    animationFrameId = requestAnimationFrame(followCursor)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animationFrameId)
    }
  }, [position.x, position.y])

  if (!visible) return null

  return (
    <div className="custom-cursor-container pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      <div
        className="custom-cursor-dot fixed rounded-full pointer-events-none transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          width: '6px',
          height: '6px',
          backgroundColor: 'var(--portfolio-accent)',
        }}
      />
      <div
        className={`custom-cursor-ring fixed rounded-full pointer-events-none border transition-all duration-200 ${
          hovered ? 'scale-150 border-accent bg-accent/10' : 'border-accent/40'
        }`}
        style={{
          transform: `translate3d(${trailing.x}px, ${trailing.y}px, 0) translate(-50%, -50%)`,
          width: '28px',
          height: '28px',
        }}
      />
    </div>
  )
}
