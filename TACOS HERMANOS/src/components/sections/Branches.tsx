"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Map as MapIcon, MapPin, Navigation, Phone } from "lucide-react";
import { allBranchesQuery, branches, mapsDirectionsUrl, mapsEmbedUrl } from "@/data/branches";
import { site } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstagramIcon } from "@/components/ui/Icons";

export function Branches() {
  const [selected, setSelected] = useState<string | null>(branches[0].id);
  const current = branches.find((b) => b.id === selected);
  const mapSrc = current ? mapsEmbedUrl(current.mapsQuery) : mapsEmbedUrl(allBranchesQuery, 11);

  return (
    <section id="sucursales" aria-labelledby="branches-title" className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="branches-title"
          eyebrow="Nuestras sucursales"
          title={
            <>
              Siempre hay una mesa
              <br />
              cerca de ti.
            </>
          }
          intro="Elige tu sucursal, revisa el horario y abre la ruta directo en Google Maps."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          {/* Map — first on mobile so a tap on a card is visible immediately */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <div className="relative h-[20rem] overflow-hidden rounded-[2rem] bg-sand ring-1 ring-forest/10 sm:h-[26rem] lg:h-[34rem]">
                <AnimatePresence mode="wait">
                  <motion.iframe
                    key={mapSrc}
                    src={mapSrc}
                    title={current ? `Mapa de Tacos Hermanos ${current.name}` : "Mapa de las sucursales de Tacos Hermanos"}
                    className="absolute inset-0 h-full w-full border-0 grayscale-[0.25]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  />
                </AnimatePresence>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-pressed={selected === null}
                className={`mt-4 inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold transition-colors ${
                  selected === null ? "bg-forest text-cream" : "text-forest ring-1 ring-forest/20 ring-inset hover:ring-forest/50"
                }`}
              >
                <MapIcon size={16} aria-hidden="true" /> Ver todas en el mapa
              </button>
            </div>
          </div>

          {/* Branch cards */}
          <ul className="order-2 space-y-4 lg:order-1">
            {branches.map((b, i) => {
              const isActive = b.id === selected;
              return (
                <motion.li
                  key={b.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  <article
                    className={`relative overflow-hidden rounded-[1.75rem] p-6 transition-all duration-500 sm:p-8 ${
                      isActive
                        ? "bg-forest text-cream shadow-[0_30px_60px_-30px_rgb(12_50_39/0.7)]"
                        : "bg-cream text-ink ring-1 ring-forest/10 hover:ring-forest/30"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(b.id)}
                      aria-pressed={isActive}
                      className="absolute inset-0 z-0 rounded-[1.75rem]"
                    >
                      <span className="sr-only">Ver {b.name} en el mapa</span>
                    </button>

                    <div className="pointer-events-none relative z-10">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className={`eyebrow text-[0.65rem] ${isActive ? "text-pina" : "text-brand"}`}>{b.area}</p>
                          <h3 className={`mt-2 text-3xl font-extrabold ${isActive ? "text-cream" : "text-forest"}`}>{b.name}</h3>
                        </div>
                        {b.note && (
                          <span className={`rounded-full px-3 py-1 text-xs font-bold ${isActive ? "bg-pina text-forest" : "bg-sand text-forest"}`}>
                            {b.note}
                          </span>
                        )}
                      </div>

                      <p className={`mt-5 flex gap-3 leading-relaxed ${isActive ? "text-cream/80" : "text-muted"}`}>
                        <MapPin size={18} className="mt-1 shrink-0" aria-hidden="true" />
                        {b.address}
                      </p>

                      <div className={`mt-4 flex gap-3 ${isActive ? "text-cream/80" : "text-muted"}`}>
                        <Clock size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                        <div className="w-full text-sm">
                          <dl className="space-y-1">
                            {b.hours.map((h) => (
                              <div key={h.days} className="flex flex-wrap justify-between gap-x-4">
                                <dt>{h.days}</dt>
                                <dd className={`font-semibold ${isActive ? "text-cream" : "text-ink"}`}>{h.time}</dd>
                              </div>
                            ))}
                          </dl>
                          {!b.hoursVerified && (
                            <p className={`pt-2 text-xs ${isActive ? "text-cream/50" : "text-ink/45"}`}>
                              Horario referencial: confírmalo antes de tu visita.
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="pointer-events-auto mt-6 flex flex-wrap gap-3">
                        <a
                          href={mapsDirectionsUrl(b.mapsQuery)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold transition-all hover:-translate-y-0.5 ${
                            isActive ? "bg-cream text-forest hover:bg-white" : "bg-brand text-white hover:bg-brand-700"
                          }`}
                        >
                          <Navigation size={16} aria-hidden="true" /> Cómo llegar
                          <span className="sr-only"> a {b.name} (abre Google Maps)</span>
                        </a>
                        {b.phone && (
                          <a
                            href={b.phone.href}
                            className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-bold ring-1 ring-inset transition-colors ${
                              isActive ? "text-cream ring-cream/30 hover:ring-cream" : "text-forest ring-forest/20 hover:ring-forest/50"
                            }`}
                          >
                            <Phone size={16} aria-hidden="true" /> {b.phone.display}
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </motion.li>
              );
            })}

            <li className="flex items-center justify-between gap-4 rounded-[1.75rem] border border-dashed border-forest/25 p-6 sm:p-8">
              <p className="text-muted">
                <span className="font-display block text-xl font-bold text-forest">¿Una sucursal en tu ciudad?</span>
                Anunciamos nuevas aperturas primero en Instagram.
              </p>
              <a
                href={site.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seguir a Tacos Hermanos en Instagram"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-forest text-cream transition-transform hover:scale-110"
              >
                <InstagramIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
