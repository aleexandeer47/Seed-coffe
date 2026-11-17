import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { art, Icon, LineArt } from './Art'
import { easeOut } from './Intro'

const items = [
  { name: 'Foamy Iced', desc: 'Sweet and creamy. La bebida fría de la casa.', art: art.iced, price: [['16 oz', 5.25], ['20 oz', 5.75]] },
  { name: 'Cold brew', desc: 'Receta original. También en botella concentrada de 8 oz.', art: art.bottle, price: [['Vaso', 4.0], ['Botella', 6.0]] },
  { name: 'Flan de café', desc: 'Preparado con café Pacas lavado.', art: art.flanCafe, price: [['Porción', 5.0]] },
  { name: 'Flan de coco', desc: 'El otro flan de la casa, receta original.', art: art.flanCoco, price: [['Porción', 5.0]] },
  { name: 'Bagel especial', desc: 'Con la crema de la casa.', art: art.bagel, price: [['Unidad', 5.5]] },
  { name: 'Sándwich de pollo con huevo', desc: 'Receta original del menú salado.', art: art.sandwich, price: [['Unidad', 6.6]] },
] as const

function TiltCard({ item, index }: { item: (typeof items)[number]; index: number }) {
  const rx = useSpring(0, { stiffness: 180, damping: 18 })
  const ry = useSpring(0, { stiffness: 180, damping: 18 })
  const gx = useMotionValue(50)
  const gy = useMotionValue(30)
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.85), transparent 55%)`

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 22)
    rx.set(-(py - 0.5) * 16)
    gx.set(px * 100)
    gy.set(py * 100)
  }
  const leave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.article
      className="sig-card"
      initial={{ opacity: 0, y: 60, rotateY: -30 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: easeOut, delay: (index % 3) * 0.06 }}
    >
      <motion.div className="sig-inner" style={{ rotateX: rx, rotateY: ry }} onPointerMove={move} onPointerLeave={leave}>
        <div className="sig-top">
          <span className="num">{String(index + 1).padStart(2, '0')}</span>
          <span className="badge-original">{Icon.seal} Receta original</span>
        </div>
        <div className="sig-art">
          <LineArt paths={[...item.art]} />
        </div>
        <div className="sig-body">
          <h3>{item.name}</h3>
          <p>{item.desc}</p>
          <div className="sig-price num">
            {item.price.map(([l, p]) => (
              <span key={l}>
                <span style={{ fontWeight: 400, color: 'var(--ink-2)' }}>{l} </span>${p.toFixed(2)}
              </span>
            ))}
          </div>
        </div>
        <motion.div className="sig-glare" style={{ background: glare }} />
      </motion.div>
    </motion.article>
  )
}

export function Signature() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [dist, setDist] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      if (track.current) setDist(Math.max(0, track.current.scrollWidth - window.innerWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (track.current) ro.observe(track.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const x = useTransform(smooth, (v) => -v * dist)

  return (
    <section id="recetas" ref={section} className="signature" style={{ height: `calc(100svh + ${dist}px)` }}>
      <div className="signature-sticky">
        <div className="wrap signature-head">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: easeOut }}
          >
            Recetas originales
          </motion.h2>
          <p>Lo que solo vas a encontrar en Seed. En el menú las marcamos con un check.</p>
        </div>
        <motion.div ref={track} className="signature-track" style={{ x, paddingRight: 'var(--gutter)' }}>
          {items.map((it, i) => (
            <TiltCard key={it.name} item={it} index={i} />
          ))}
        </motion.div>
        <div className="wrap">
          <div className="signature-progress">
            <motion.div style={{ scaleX: smooth }} />
          </div>
        </div>
      </div>
    </section>
  )
}
