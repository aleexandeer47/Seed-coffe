"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Sunburst } from "@/components/ui/Sunburst";
import { salsas } from "@/data/menu";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 90]);
  const raysRotate = useTransform(scrollY, [0, 800], [0, reduce ? 0 : 40]);

  const line = (delay: number) => ({
    initial: { y: "105%" },
    animate: { y: 0 },
    transition: { duration: 1, delay, ease },
  });

  return (
    <section id="inicio" aria-labelledby="hero-title" className="grain relative overflow-hidden bg-forest text-cream">
      <div className="tile-texture absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-brand/40 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-5 pt-28 pb-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pt-24">
        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <motion.p
            className="eyebrow mb-6 flex items-center gap-3 text-pina"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="h-px w-8 bg-pina/60" aria-hidden="true" />
            Taquería mexicana · El Salvador
          </motion.p>

          <h1 id="hero-title" className="text-[3.4rem] leading-[0.92] font-extrabold tracking-[-0.035em] sm:text-7xl lg:text-[5.6rem]">
            <span className="block overflow-hidden pb-1">
              <motion.span className="block" {...line(0.15)}>Lo bonito</motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span className="block" {...line(0.27)}>
                se <em className="font-display text-pina not-italic">comparte.</em>
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="mt-7 max-w-md text-lg leading-relaxed text-cream/75 sm:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
          >
            Tacos al comal, quesabirrias y cinco salsas de la casa. Una mesa larga donde, sin habernos conocido,{" "}
            <strong className="font-bold text-cream">ya somos hermanos.</strong>
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease }}
          >
            <ButtonLink href="#menu" variant="light" icon={<ArrowRight size={18} />}>
              Explorar menú
            </ButtonLink>
            <ButtonLink href="#sucursales" variant="outline-light" icon={<MapPin size={18} />}>
              Encuentra tu sucursal
            </ButtonLink>
          </motion.div>

          <motion.ul
            className="mt-12 flex items-center gap-2"
            aria-label="Nuestras cinco salsas de la casa"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {salsas.map((s) => (
              <li key={s.name} title={s.name} className="h-3 w-3 rounded-full ring-2 ring-forest" style={{ background: s.color }}>
                <span className="sr-only">{s.name}</span>
              </li>
            ))}
            <li className="ml-2 text-sm font-semibold text-cream/60">5 salsas de la casa</li>
          </motion.ul>
        </div>

        {/* Arched photo composition */}
        <div className="relative mx-auto w-full max-w-[26rem] lg:max-w-[30rem]">
          <motion.div className="absolute -inset-[18%] text-pina/25" style={{ rotate: raysRotate }} aria-hidden="true">
            <Sunburst rays={56} className="h-full w-full" />
          </motion.div>

          <motion.div
            className="arch relative aspect-[3/4] w-full shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] ring-1 ring-white/10"
            initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.04 }}
            animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
            transition={{ duration: 1.3, delay: 0.2, ease }}
          >
            <motion.div className="absolute -inset-y-16 inset-x-0" style={{ y: photoY }}>
              <Image
                src="/images/tacos-de-asada.webp"
                alt="Orden de tacos de asada con queso gratinado, cebolla y cilantro"
                fill
                priority
                sizes="(min-width: 1024px) 30rem, 90vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="arch absolute -bottom-8 -left-6 aspect-[3/4] w-[38%] border-[6px] border-forest shadow-2xl sm:-left-14"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease }}
          >
            <Image src="/images/salsas-de-la-casa.webp" alt="Las cinco salsas de la casa en botellas de vidrio" fill sizes="12rem" className="object-cover object-[30%_50%]" />
          </motion.div>

          <motion.div
            className="absolute top-10 -right-3 rounded-2xl bg-cream px-4 py-3 text-forest shadow-xl sm:-right-8"
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 4 }}
            transition={{ duration: 0.8, delay: 1.05, ease }}
          >
            <p className="eyebrow text-[0.6rem] text-brand">La favorita</p>
            <p className="font-display text-lg leading-tight font-extrabold">Legendaria asada</p>
          </motion.div>
        </div>
      </div>

      <a
        href="#menu"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold tracking-widest text-cream/50 uppercase transition-colors hover:text-cream md:flex"
      >
        Descubre
        <ArrowDown size={16} className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
