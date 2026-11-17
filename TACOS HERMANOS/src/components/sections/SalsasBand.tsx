import Image from "next/image";
import { salsas } from "@/data/menu";
import { Reveal } from "@/components/ui/Reveal";

/** "La barra de salsas": the five house salsas, named as on the official bottles. */
export function SalsasBand() {
  return (
    <section aria-labelledby="salsas-title" className="grain relative overflow-hidden bg-forest-950 text-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-28">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
            <Image
              src="/images/salsas-de-la-casa.webp"
              alt="Botellas de las salsas Taquera, Cilantro Jalapeño, Piña Habanero, Dulce de Chipotle y Aguacate"
              fill
              sizes="(min-width: 1024px) 40rem, 92vw"
              className="object-cover"
            />
          </div>
          <p className="font-display absolute -bottom-6 -left-2 text-[5.5rem] leading-none font-extrabold text-pina sm:-left-6 sm:text-[7.5rem]" aria-hidden="true">
            ×5
          </p>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3 text-pina">
              <span className="h-px w-8 bg-pina/60" aria-hidden="true" />
              Salsas de la casa
            </p>
            <h2 id="salsas-title" className="text-[2.4rem] leading-[1.02] font-extrabold sm:text-5xl">
              Somos la salsa
              <br />
              en tu taco.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-cream/70">
              Cinco recetas propias en la mesa, para que cada quien arme su taco a su manera: del picor de la Taquera a la frescura del Aguacate.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
          <ol className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {salsas.map((s, i) => (
                <li key={s.name} className="group flex items-center gap-5 py-4">
                  <span className="w-6 text-xs font-bold text-cream/40">0{i + 1}</span>
                  <span
                    className="h-9 w-2 rounded-full transition-[height] duration-500 ease-[var(--ease-out-soft)] group-hover:h-11"
                    style={{ background: s.color }}
                    aria-hidden="true"
                  />
                  <span className="font-display text-2xl font-bold tracking-tight transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-2 sm:text-3xl">
                    {s.name}
                  </span>
                </li>
            ))}
          </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
