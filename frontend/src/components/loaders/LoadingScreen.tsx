import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

const loadingSteps = [
  'INITIALIZING...',
  'LOADING DIGITAL IDENTITY...',
  'LOADING PROJECT INDEX...',
  'LOADING TECHNOLOGY UNIVERSE...',
]

export function LoadingScreen({ visible }: { visible: boolean }) {
  const reduceMotion = useReducedMotion()
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!visible || reduceMotion) return
    const interval = window.setInterval(() => setStep((current) => Math.min(current + 1, loadingSteps.length - 1)), 210)
    return () => window.clearInterval(interval)
  }, [reduceMotion, visible])
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          role="status"
          aria-live="polite"
          aria-label="Portfolio is loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -16 }}
          transition={{ duration: reduceMotion ? 0.12 : 0.55, ease: 'easeInOut' }}
        >
          <div className="loading-screen__content">
            <div className="loading-screen__logo">DHANANJAY<span>.</span>OS</div>
            <div className="loading-screen__status"><i /> {loadingSteps[step]}</div>
            <div className="loading-screen__bar"><span /></div>
            <div className="loading-screen__footer"><span>PERSONAL PORTFOLIO SYSTEM</span><span>BUILD 01.06</span></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
