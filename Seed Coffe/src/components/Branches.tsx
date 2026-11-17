import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { branches, INSTAGRAM, type Branch } from '../data/branches'
import { useOpenNow } from '../lib/useOpenNow'
import { Icon } from './Art'
import { easeOut } from './Intro'

function BranchCard({ b }: { b: Branch }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.35'] })
  const rotateX = useTransform(scrollYProgress, [0, 1], [28, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.88, 1])
  const y = useTransform(scrollYProgress, [0, 1], [80, 0])
  const open = useOpenNow(b)
  const q = encodeURIComponent(b.mapsQuery)
  const tel = b.phone.replace(/\s/g, '')

  return (
    <div style={{ perspective: 1400 }}>
      <motion.article ref={ref} className="branch" style={{ rotateX, scale, y }}>
        <div className="branch-info">
          <span className="status">
            <i className={`dot${open ? ' open' : ''}`} />
            {open ? 'Abierto ahora' : 'Cerrado en este momento'}
          </span>
          <h3>{b.name}</h3>
          <dl>
            <div>
              <dt>Dirección</dt>
              <dd>
                {b.address}
                <br />
                {b.city}
              </dd>
            </div>
            <div>
              <dt>Horario</dt>
              <dd>{b.hoursLabel}</dd>
            </div>
            <div>
              <dt>Teléfono</dt>
              <dd>
                <a href={`tel:${tel}`}>{b.phone}</a>
              </dd>
            </div>
            {b.delivery && (
              <div>
                <dt>Delivery</dt>
                <dd>Disponible en {b.delivery}</dd>
              </div>
            )}
          </dl>
          <div className="branch-actions">
            <a className="btn btn-ink" href={`https://www.google.com/maps/search/?api=1&query=${q}`} target="_blank" rel="noreferrer">
              {Icon.pin} Abrir en Maps
            </a>
            <a className="btn btn-ghost" href={INSTAGRAM} target="_blank" rel="noreferrer">
              {Icon.ig} Instagram
            </a>
          </div>
        </div>
        <div className="branch-map">
          <iframe title={`Mapa de ${b.name}`} loading="lazy" src={`https://maps.google.com/maps?q=${q}&z=16&output=embed`} />
        </div>
      </motion.article>
    </div>
  )
}

export function Branches() {
  return (
    <section className="branches" id="visitanos">
      <div className="wrap">
        <div className="branches-head">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: easeOut }}
          >
            {branches.length > 1 ? 'Sucursales' : 'Visítanos'}
          </motion.h2>
          <p>Pasa por la barra o pide a domicilio por PedidosYa. Novedades y postre de la semana en Instagram.</p>
        </div>
        {branches.map((b) => (
          <BranchCard key={b.name} b={b} />
        ))}
      </div>
    </section>
  )
}
