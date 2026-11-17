import { motion, useScroll, useTransform } from 'motion/react'
import { lazy, Suspense, useRef } from 'react'
import { branches } from '../data/branches'
import { useOpenNow } from '../lib/useOpenNow'
import { Icon, Starburst } from './Art'
import { easeOut, fadeUp, INTRO } from './Intro'

const CupScene = lazy(() => import('../three/CupScene'))

const RING = 'SEED COFFEE CO. · CAFÉ DE ESPECIALIDAD · SAN SALVADOR · '

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -160])
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const discScale = useTransform(scrollYProgress, [0, 1], [1, 1.3])
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 140])
  const stickerY = useTransform(scrollYProgress, [0, 1], [0, -220])
  const sticker2Y = useTransform(scrollYProgress, [0, 1], [0, 140])
  const branch = branches[0]
  const open = useOpenNow(branch)

  const lines = ['Buen café', 'empieza con', 'una semilla.']

  return (
    <section id="top" ref={ref} className="hero">
      <div className="wrap hero-grid">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <h1>
            {lines.map((l, i) => (
              <span className="line-mask" key={l}>
                <motion.span initial={{ y: '110%' }} animate={{ y: '0%' }} transition={{ delay: INTRO + i * 0.09, duration: 1.1, ease: easeOut }}>
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className="hero-lede" {...fadeUp(INTRO + 0.4)}>
            Café salvadoreño de especialidad, cold brew de receta original y una barra corta de bagels, paninis y postres de la casa. En San Salvador,
            de lunes a sábado.
          </motion.p>
          <motion.div className="hero-ctas" {...fadeUp(INTRO + 0.5)}>
            <a className="btn btn-ink" href="#menu">
              Ver el menú {Icon.arrow}
            </a>
            <a className="btn btn-ghost" href="#visitanos">
              {Icon.pin} Cómo llegar
            </a>
          </motion.div>
        </motion.div>

        <div className="stage">
          <motion.div
            className="stage-disc"
            style={{ scale: discScale }}
            initial={{ clipPath: 'circle(0% at 50% 50%)' }}
            animate={{ clipPath: 'circle(50% at 50% 50%)' }}
            transition={{ delay: INTRO - 0.1, duration: 1.2, ease: easeOut }}
          />
          <motion.div
            className="stage-ring"
            style={{ rotate: ringRotate }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: INTRO + 0.2, duration: 1.2, ease: easeOut }}
          >
            <svg viewBox="0 0 600 600" style={{ animation: 'spin 40s linear infinite' }} aria-hidden="true">
              <defs>
                <path id="ring" d="M300 300 m-284 0 a284 284 0 1 1 568 0 a284 284 0 1 1 -568 0" />
              </defs>
              <text fill="currentColor">
                <textPath href="#ring" textLength="1780" lengthAdjust="spacing">
                  {RING + RING}
                </textPath>
              </text>
            </svg>
          </motion.div>

          <Suspense fallback={null}>
            <CupScene progress={scrollYProgress} introDelay={INTRO + 0.1} />
          </Suspense>

          <motion.div className="sticker sticker-green" style={{ y: stickerY }}>
            <motion.div
              style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}
              initial={{ scale: 0, rotate: -60 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: INTRO + 0.8, type: 'spring', stiffness: 160, damping: 12 }}
            >
              <div style={{ position: 'absolute', inset: 0, animation: 'spin 24s linear infinite' }}>
                <Starburst fill="#1d4d33" />
              </div>
              <span>
                Specialty
                <br />
                coffee
                <b className="num">$20</b>
              </span>
            </motion.div>
          </motion.div>

          <motion.div className="sticker sticker-red" style={{ y: sticker2Y }}>
            <motion.div
              style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}
              initial={{ scale: 0, rotate: 60 }}
              animate={{ scale: 1, rotate: -8 }}
              transition={{ delay: INTRO + 1, type: 'spring', stiffness: 160, damping: 12 }}
            >
              <div style={{ position: 'absolute', inset: 0, animation: 'spin 30s linear infinite reverse' }}>
                <Starburst fill="#c23a2a" spikes={20} depth={0.12} />
              </div>
              <span>
                Receta
                <br />
                original
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div className="wrap" {...fadeUp(INTRO + 0.7)}>
        <div className="hero-meta">
          <span>
            <i className={`dot${open ? ' open' : ''}`} />
            {open ? 'Abierto ahora' : 'Cerrado ahora'} · Lun – Sáb, 9:00 a 20:00
          </span>
          <span>{branch.address}, San Salvador</span>
          <span>Delivery por {branch.delivery}</span>
        </div>
      </motion.div>
      <motion.div
        className="checker"
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ transformOrigin: 'bottom' }}
        transition={{ delay: INTRO + 0.5, duration: 0.8, ease: easeOut }}
      />
    </section>
  )
}
