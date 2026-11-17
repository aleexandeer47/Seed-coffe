"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { manifesto, story, values } from "@/data/about";
import { branches } from "@/data/branches";
import { salsas } from "@/data/menu";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArchMark } from "@/components/ui/Icons";

const stats = [
  { value: String(branches.length), label: "Sucursales en El Salvador" },
  { value: String(salsas.length), label: "Salsas de la casa" },
  { value: "117K", label: "Hermanos en Instagram" },
];

export function About() {
  return (
    <section id="nosotros" aria-labelledby="about-title" className="relative overflow-hidden bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Story */}
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="relative">
            <div className="arch relative aspect-[4/5] w-full max-w-md">
              <Image
                src="/images/barra-cocina-abierta.webp"
                alt="Barra de cocina abierta con el equipo de Tacos Hermanos preparando tacos y el corazón de luz al fondo"
                fill
                sizes="(min-width: 1024px) 28rem, 92vw"
                className="object-cover object-[38%_50%]"
              />
            </div>
            <div className="absolute right-0 bottom-10 hidden max-w-[15rem] rounded-3xl bg-forest p-6 text-cream shadow-2xl sm:block lg:-right-10">
              <ArchMark className="text-pina" />
              <p className="font-display mt-4 text-xl leading-snug font-bold">Cocina a la vista, del comal a tu plato.</p>
            </div>
          </Reveal>

          <div className="flex flex-col justify-center">
            <SectionHeading
              id="about-title"
              eyebrow="Nosotros"
              title={
                <>
                  Aquí nadie llega como cliente.{" "}
                  <span className="text-brand">Llega como hermano.</span>
                </>
              }
            />
            {/* story.provisional === true → texto editable pendiente de la historia oficial (ver src/data/about.ts) */}
            <Reveal delay={0.1} className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
              {story.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>

            <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-forest/15 pt-8">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={0.1 + i * 0.08}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-4xl font-extrabold text-forest sm:text-5xl">{s.value}</dd>
                  <dd className="mt-1 text-sm leading-snug text-muted">{s.label}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>

        {/* Values */}
        <ul className="mt-24 grid gap-px overflow-hidden rounded-[2rem] bg-forest/10 sm:grid-cols-3">
          {values.map((v, i) => (
            <li key={v.title} className="bg-cream">
              <Reveal delay={i * 0.1} className="group h-full p-8 transition-colors duration-500 hover:bg-paper sm:p-10">
                <span className="eyebrow text-teal">0{i + 1}</span>
                <h3 className="mt-6 text-2xl font-extrabold text-forest">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{v.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        {/* Manifesto — transcribed from the wall at the restaurant */}
        <div className="grain relative mt-24 overflow-hidden rounded-[2.25rem] bg-forest text-cream">
          <div className="tile-texture absolute inset-0 opacity-70" aria-hidden="true" />
          <div className="relative grid lg:grid-cols-[1fr_0.85fr]">
            <figure className="p-8 sm:p-14 lg:p-16">
              <p className="eyebrow flex items-center gap-3 text-pina">
                <span className="h-px w-8 bg-pina/60" aria-hidden="true" />
                Nuestro manifiesto
              </p>
              <blockquote className="mt-8 space-y-1">
                {manifesto.map((line, i) => {
                  const shout = line.startsWith("¡");
                  return (
                    <motion.p
                      key={line}
                      initial={{ opacity: 0, x: -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                      transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                      className={
                        shout
                          ? `font-display text-3xl leading-tight font-extrabold sm:text-[2.6rem] ${i === manifesto.length - 1 ? "text-pina" : "text-cream"}`
                          : "pt-3 text-lg text-cream/60 sm:text-xl"
                      }
                    >
                      {line}
                    </motion.p>
                  );
                })}
              </blockquote>
            </figure>
            <div className="relative min-h-[22rem] lg:min-h-full">
              <Image
                src="/images/terraza-restaurante.webp"
                alt="Terraza de Tacos Hermanos con el manifiesto de la marca en la pared y el letrero de neón “Lo bonito se comparte”"
                fill
                sizes="(min-width: 1024px) 40vw, 92vw"
                className="object-cover object-[62%_50%]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/20 to-transparent max-lg:bg-gradient-to-b" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
