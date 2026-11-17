import { motion } from 'motion/react'
import { branches, INSTAGRAM } from '../data/branches'
import { easeOut } from './Intro'

export function Footer() {
  const b = branches[0]
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: easeOut }}
          >
            Te esperamos con la taza lista.
          </motion.h2>
          <div className="footer-links">
            <div>
              <b>Síguenos</b>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer">
                @seedcoffeesv
              </a>
            </div>
            <div>
              <b>Llámanos</b>
              <a href={`tel:${b.phone.replace(/\s/g, '')}`}>{b.phone}</a>
            </div>
            <div>
              <b>Horario</b>
              <span>Lun – Sáb, 9:00 a 20:00</span>
            </div>
          </div>
        </div>
        {/* Trigger on the container: the letters start clipped, so they can't be "in view" themselves. */}
        <motion.div className="wordmark" aria-hidden="true" initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.3 }}>
          {'seed'.split('').map((c, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { y: '100%', rotate: 8 },
                shown: { y: '0%', rotate: 0, transition: { delay: i * 0.08, duration: 1.1, ease: easeOut } },
              }}
            >
              {c}
            </motion.span>
          ))}
        </motion.div>
      </div>
      <div className="checker" aria-hidden="true" />
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Seed Coffee · San Salvador, El Salvador</span>
        <span>Café de especialidad</span>
      </div>
    </footer>
  )
}
