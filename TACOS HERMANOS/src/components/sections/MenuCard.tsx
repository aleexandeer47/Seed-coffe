import Image from "next/image";
import type { MenuItem } from "@/data/menu";
import { Sunburst } from "@/components/ui/Sunburst";

const priceFormat = new Intl.NumberFormat("es-SV", { style: "currency", currency: "USD" });

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-forest">
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.06]"
          />
        ) : (
          // Branded placeholder until the official dish photo is supplied.
          <div className="tile-texture absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <Sunburst rays={40} className="animate-spin-slow absolute h-[85%] w-[85%] text-teal/25" />
            <p className="font-display relative text-[2rem] leading-[0.95] font-extrabold text-cream">{item.name}</p>
            <p className="eyebrow relative mt-4 text-[0.6rem] text-cream/50">Fotografía próximamente</p>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {item.tags?.[0] && (
          <span className="absolute top-4 left-4 rounded-full bg-cream/95 px-3 py-1.5 text-xs font-bold text-forest shadow-sm backdrop-blur">
            {item.tags[0]}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-2xl leading-tight font-extrabold text-forest transition-colors group-hover:text-brand">{item.name}</h3>
          <span className="shrink-0 text-sm font-bold text-brand">
            {item.price !== null ? priceFormat.format(item.price) : <span className="font-semibold text-muted">Precio en sucursal</span>}
          </span>
        </div>
        <p className="mt-2 leading-relaxed text-muted">{item.description}</p>
      </div>
    </article>
  );
}
