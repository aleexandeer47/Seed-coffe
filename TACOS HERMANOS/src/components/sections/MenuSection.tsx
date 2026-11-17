"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sunrise } from "lucide-react";
import { menuCategories, menuItems, type MenuCategoryId } from "@/data/menu";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MenuCard } from "./MenuCard";
import { MenuListItem } from "./MenuListItem";
import { ArchMark } from "@/components/ui/Icons";

type Filter = MenuCategoryId | "todos";

export function MenuSection() {
  const [filter, setFilter] = useState<Filter>("todos");

  const counts = useMemo(() => {
    const c: Record<string, number> = { todos: menuItems.length };
    menuItems.forEach((i) => (c[i.category] = (c[i.category] ?? 0) + 1));
    return c;
  }, []);

  const visible = filter === "todos" ? menuItems : menuItems.filter((i) => i.category === filter);
  // Photos lead; dishes still awaiting an official photo read as an editorial menu list.
  const withPhoto = visible.filter((i) => i.image);
  const textOnly = visible.filter((i) => !i.image);

  return (
    <section id="menu" aria-labelledby="menu-title" className="relative bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="menu-title"
            eyebrow="Nuestro menú"
            title={
              <>
                Del comal
                <br />a tu mesa.
              </>
            }
            intro="Tortillas calientes, carnes hechas con paciencia y especialidades que se piden de dos en dos."
          />

          <div
            role="group"
            aria-label="Filtrar menú por categoría"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 lg:justify-end"
          >
            {menuCategories.map((cat) => {
              const selected = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(cat.id)}
                  className={`relative min-h-11 shrink-0 rounded-full px-5 text-sm font-bold transition-colors duration-300 ${
                    selected ? "text-cream" : "text-ink/70 ring-1 ring-ink/15 ring-inset hover:text-forest hover:ring-forest/40"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="menu-filter"
                      className="absolute inset-0 rounded-full bg-forest"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    {cat.label}
                    <span className={`ml-1.5 text-xs ${selected ? "text-pina" : "text-ink/40"}`}>{counts[cat.id] ?? 0}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {filter === "desayunos" && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-sand px-4 py-2 text-sm font-semibold text-forest"
          >
            <Sunrise size={16} aria-hidden="true" /> Desayunos exclusivos en La Gran Vía · lunes a domingo de 7:00 a 10:30 am
          </motion.p>
        )}

        <div aria-live="polite">
          {withPhoto.length > 0 && (
            <motion.ul layout className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {withPhoto.map((item, i) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.55, delay: Math.min(i * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
                  >
                    <MenuCard item={item} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}

          {textOnly.length > 0 && (
            <motion.div layout className={withPhoto.length ? "mt-20" : "mt-12"}>
              {withPhoto.length > 0 && (
                <h3 className="eyebrow mb-6 flex items-center gap-3 text-brand">
                  <ArchMark size={18} /> También en la carta
                </h3>
              )}
              <ul className="grid gap-x-14 sm:grid-cols-2">
                <AnimatePresence mode="popLayout" initial={false}>
                  {textOnly.map((item, i) => (
                    <motion.li
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
                    >
                      <MenuListItem item={item} />
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </motion.div>
          )}
        </div>

        <p className="mt-14 border-t border-ink/10 pt-6 text-sm text-muted">
          Precios y disponibilidad pueden variar por sucursal. Consulta la carta vigente en tu visita.
        </p>
      </div>
    </section>
  );
}
