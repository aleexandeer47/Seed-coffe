import { AnimatePresence, motion, type MotionStyle } from 'motion/react'
import { useState } from 'react'
import { menu, price } from '../data/menu'
import { art, Icon, LineArt } from './Art'
import { easeOut } from './Intro'

const aside: Record<string, { title: string; text: string; price: number; art: readonly string[] }> = {
  'cafe-caliente': { title: 'Café para casa', text: 'Bolsa de café de especialidad para preparar a tu manera.', price: 20, art: art.beanBag },
  'caliente-sin-cafe': { title: 'Flan de café', text: 'Hecho con café Pacas lavado. Receta original.', price: 5, art: art.flanCafe },
  'cafe-frio': { title: 'Cold brew en botella', text: 'Concentrado de 8 oz para llevar.', price: 6, art: art.bottle },
  'frio-sin-cafe': { title: 'Para acompañar', text: 'Sándwich de pollo con huevo, receta original.', price: 6.6, art: art.sandwich },
  salado: { title: 'Bagel especial', text: 'Con la crema de la casa. Receta original.', price: 5.5, art: art.bagel },
  dulce: { title: 'Flan de coco', text: 'Uno de los dos flanes de la casa.', price: 5, art: art.flanCoco },
}

const colsVar = (cols: number) => ({ '--cols': cols }) as unknown as MotionStyle

const row = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.04 * i, duration: 0.5, ease: easeOut } }),
}

export function Menu() {
  const [active, setActive] = useState(menu[0].id)
  const cat = menu.find((c) => c.id === active)!
  const side = aside[active]
  let n = 0

  return (
    <section className="menu" id="menu">
      <div className="wrap">
        <div className="menu-head">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: easeOut }}
          >
            El menú
          </motion.h2>
          <p>
            Precios en dólares. Lo marcado con <span className="badge-original">{Icon.seal} Receta original</span> es de la casa.
          </p>
        </div>

        <div className="tabs" role="tablist" aria-label="Categorías del menú">
          {menu.map((c) => (
            <button
              key={c.id}
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={active === c.id}
              aria-controls="menu-panel"
              className="tab"
              onClick={() => setActive(c.id)}
            >
              {active === c.id && <motion.span layoutId="tab-pill" className="tab-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <span className="tab-label">{c.label}</span>
            </button>
          ))}
        </div>

        <div className="menu-panel">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              id="menu-panel"
              role="tabpanel"
              aria-labelledby={`tab-${active}`}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            >
              {cat.groups.map((g, gi) => {
                const cols = g.sizes.length
                const plain = cols === 1 && g.sizes[0] === ''
                return (
                  <div className="menu-group" key={gi}>
                    {g.title && (
                      <motion.h3 className="menu-group-title" variants={row} custom={n++}>
                        {g.title}
                      </motion.h3>
                    )}
                    {!plain && (
                      <motion.div className="menu-row header" style={colsVar(cols)} variants={row} custom={n++}>
                        <span />
                        {g.sizes.map((s) => (
                          <span key={s}>{s}</span>
                        ))}
                      </motion.div>
                    )}
                    {g.items.map((it) => (
                      <motion.div key={it.name} className="menu-row" style={colsVar(cols)} variants={row} custom={n++}>
                        <div>
                          <span className="menu-name">
                            {it.name}
                            {it.original && (
                              <span className="badge-original" title="Receta original">
                                {Icon.seal} Receta original
                              </span>
                            )}
                          </span>
                          {it.note && <span className="menu-note">{it.note}</span>}
                        </div>
                        {it.prices.map((p, pi) => (
                          <span key={pi} className={`menu-price num${p == null ? ' empty' : ''}`}>
                            {p == null ? <span aria-label="No disponible">—</span> : price(p)}
                            {!plain && p != null && <span className="sr-only"> ({g.sizes[pi]})</span>}
                          </span>
                        ))}
                      </motion.div>
                    ))}
                  </div>
                )
              })}
              {cat.footnote && (
                <motion.p className="menu-foot" variants={row} custom={n++}>
                  {cat.footnote}
                </motion.p>
              )}
            </motion.div>
          </AnimatePresence>

          <motion.aside
            className="menu-aside"
            initial={{ opacity: 0, rotateX: 20, y: 40 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: easeOut }}
            style={{ transformPerspective: 900 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: easeOut }}
              >
                <div className="aside-art">
                  <LineArt paths={[...side.art]} strokeWidth={2.6} />
                </div>
                <h3>{side.title}</h3>
                <p>{side.text}</p>
                <p className="num" style={{ marginTop: 16, color: 'var(--paper)', fontSize: 22, fontWeight: 600 }}>
                  {price(side.price)}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}
