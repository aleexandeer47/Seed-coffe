import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { Badge } from './Art'

/** Seconds until the page content starts its entrance (after the preloader wipes). */
export const INTRO = 1.15
export const easeOut = [0.23, 1, 0.32, 1] as const
const wipe = [0.76, 0, 0.24, 1] as const

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease: easeOut },
})

export function Preloader() {
  const [done, setDone] = useState(false)
  const cols = 8
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 2200)
    return () => clearTimeout(t)
  }, [])
  if (done) return null
  return (
    <>
      <div className="preloader" style={{ '--cols': cols } as React.CSSProperties} aria-hidden="true">
        {Array.from({ length: cols }, (_, i) => (
          <motion.div
            key={i}
            className="tile"
            initial={{ y: '0%' }}
            animate={{ y: i % 2 ? '100%' : '-100%' }}
            transition={{ delay: 0.75 + Math.abs(i - (cols - 1) / 2) * 0.05, duration: 0.75, ease: wipe }}
          />
        ))}
      </div>
      <motion.div
        className="preloader-mark"
        aria-hidden="true"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.7, duration: 0.2 }}
      >
        <div style={{ display: 'flex', font: "900 clamp(72px,14vw,160px)/0.9 'Fraunces', serif", letterSpacing: '-0.05em', overflow: 'hidden', paddingBottom: '0.06em' }}>
          {'seed'.split('').map((c, i) => (
            <motion.span key={i} initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ delay: i * 0.06, duration: 0.6, ease: easeOut }}>
              {c}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </>
  )
}

export function Nav() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setHidden(v > prev && v > 480)
    setScrolled(v > 24)
  })
  return (
    <motion.header
      className={`nav${scrolled ? ' scrolled' : ''}`}
      initial={{ y: '-100%' }}
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.45, ease: easeOut, delay: hidden || scrolled ? 0 : INTRO + 0.2 }}
    >
      <div className="wrap nav-inner">
        <a href="#top" className="brand" aria-label="Seed Coffee, ir al inicio">
          <Badge size={38} />
          <span className="brand-word">seed</span>
        </a>
        <nav className="nav-links" aria-label="Principal">
          <a href="#recetas">Recetas</a>
          <a href="#menu">Menú</a>
          <a href="#visitanos">Visítanos</a>
          <a className="btn btn-ink" href="#visitanos">
            Cómo llegar
          </a>
        </nav>
      </div>
    </motion.header>
  )
}
