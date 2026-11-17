import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { LineArt, storefront } from './Art'
import { easeOut } from './Intro'

const TEXT =
  'Seed es una barra pequeña con una idea simple: tratar cada taza como una semilla. Café salvadoreño de especialidad, métodos filtrados, cold brew de receta propia y una cocina corta, salada y dulce, para quedarse un rato sin prisa.'

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const y = useTransform(progress, range, [8, 0])
  return (
    <motion.span className="w" style={{ opacity, y }}>
      {children}
    </motion.span>
  )
}

const facts = [
  { k: 'Lun – Sáb', v: 'Abrimos de 9:00 a.m. a 8:00 p.m.' },
  { k: '$20', v: 'Bolsa de café de especialidad para llevar' },
  { k: '+$0.80', v: 'Leche vegetal o saborizante en cualquier bebida' },
]

export function Story() {
  const pRef = useRef<HTMLParagraphElement>(null)
  const artRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: textP } = useScroll({ target: pRef, offset: ['start 0.85', 'end 0.5'] })
  const { scrollYProgress: artP } = useScroll({ target: artRef, offset: ['start end', 'center 0.45'] })
  const { scrollYProgress: artFull } = useScroll({ target: artRef, offset: ['start end', 'end start'] })
  const rotY = useTransform(artFull, [0, 0.5, 1], [-28, 0, 18])
  const rotX = useTransform(artFull, [0, 0.5, 1], [14, 0, -10])
  const signOpacity = useTransform(artP, [0.75, 0.95], [0, 1])
  const words = TEXT.split(' ')

  return (
    <section className="story" id="historia">
      <div className="wrap story-grid">
        <div>
          <motion.span
            className="label"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            La casa
          </motion.span>
          <p ref={pRef} className="reveal-text">
            {words.map((w, i) => (
              <Word key={i} progress={textP} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </Word>
            ))}
          </p>
          <div className="facts">
            {facts.map((f, i) => (
              <motion.div
                key={f.k}
                className="fact"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: easeOut }}
              >
                <b className="num">{f.k}</b>
                <span>{f.v}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div ref={artRef} className="storefront">
          <motion.div className="storefront-card" style={{ rotateY: rotY, rotateX: rotX }}>
            <LineArt paths={storefront} viewBox="0 0 300 300" strokeWidth={2.6} progress={artP}>
              <motion.text
                x="121"
                y="171"
                textAnchor="middle"
                fill="currentColor"
                stroke="none"
                style={{ opacity: signOpacity, font: "800 22px 'Fraunces', serif" }}
              >
                Seed
              </motion.text>
            </LineArt>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
