import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { useRef } from 'react'

const wrap = (min: number, max: number, v: number) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

const Leaf = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 22 Q3 13 12 2 Q21 13 12 22 Z" fill="currentColor" />
  </svg>
)

function Row({ items, speed, outline }: { items: string[]; speed: number; outline?: boolean }) {
  const reduce = useReducedMotion()
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(velocity, [-1500, 0, 1500], [-4, 0, 4], { clamp: false })
  const skew = useTransform(velocity, [-2500, 2500], [-10, 10], { clamp: true })
  const dir = useRef(1)
  const x = useTransform(base, (v) => `${wrap(-25, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    const b = boost.get()
    if (b < 0) dir.current = -1
    else if (b > 0) dir.current = 1
    base.set(base.get() + dir.current * speed * (delta / 1000) * (1 + Math.abs(b)))
  })

  return (
    <motion.div className={`marquee-row${outline ? ' outline' : ''}`} style={{ x, skewX: skew }}>
      {Array.from({ length: 4 }, (_, k) => (
        <div key={k} className="marquee-item" aria-hidden={k > 0}>
          {items.map((t) => (
            <span key={t} style={{ display: 'contents' }}>
              {t}
              {Leaf}
            </span>
          ))}
        </div>
      ))}
    </motion.div>
  )
}

export function Marquee() {
  return (
    <section className="marquee" aria-label="Favoritos de la casa">
      <Row items={['Cold brew', 'Foamy Iced', 'Flan de café', 'Bagel especial', 'Métodos']} speed={-2.2} />
      <Row items={['Matcha', 'Taro', 'Chai', 'Soda italiana', 'Frappuchata', 'Pie de limón']} speed={2.2} outline />
    </section>
  )
}
