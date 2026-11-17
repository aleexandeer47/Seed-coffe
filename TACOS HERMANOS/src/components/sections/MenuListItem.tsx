import type { MenuItem } from "@/data/menu";
import { menuCategories } from "@/data/menu";

const priceFormat = new Intl.NumberFormat("es-SV", { style: "currency", currency: "USD" });
const categoryLabel = (id: string) => menuCategories.find((c) => c.id === id)?.label ?? "";

/** Editorial menu row for dishes without an official photo yet. */
export function MenuListItem({ item }: { item: MenuItem }) {
  return (
    <article className="group flex h-full flex-col border-t border-forest/15 py-6 transition-colors">
      <div className="flex items-baseline gap-3">
        <h3 className="text-[1.6rem] leading-tight font-extrabold text-forest transition-colors duration-300 group-hover:text-brand">
          {item.name}
        </h3>
        <span className="mb-1.5 flex-1 border-b-2 border-dotted border-forest/20" aria-hidden="true" />
        <span className="shrink-0 text-sm font-bold text-muted">
          {item.price !== null ? priceFormat.format(item.price) : "Precio en sucursal"}
        </span>
      </div>
      <p className="mt-2 max-w-md leading-relaxed text-muted">{item.description}</p>
      <p className="mt-3 flex flex-wrap gap-2">
        <span className="eyebrow text-[0.62rem] text-teal">{categoryLabel(item.category)}</span>
        {item.tags?.map((t) => (
          <span key={t} className="eyebrow text-[0.62rem] text-chile">
            · {t}
          </span>
        ))}
      </p>
    </article>
  );
}
