import { ArrowUp } from "lucide-react";
import { branches, mapsDirectionsUrl } from "@/data/branches";
import { navLinks, site } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, TikTokIcon } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain relative overflow-hidden bg-forest-950 text-cream">
      {/* Oversized wordmark line as closing statement */}
      <div className="border-b border-white/10">
        <p className="font-display mx-auto max-w-7xl px-5 py-14 text-[13vw] leading-[0.85] font-extrabold tracking-[-0.05em] text-cream/[0.07] select-none sm:px-8 lg:text-[9.5rem]" aria-hidden="true">
          ¡Ya somos hermanos!
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo variant="white" className="h-10 w-auto" />
          <p className="mt-6 max-w-xs leading-relaxed text-cream/60">
            Taquería mexicana en El Salvador. Tacos, especialidades y salsas de la casa para compartir.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={site.social.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Tacos Hermanos" className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 transition-colors hover:border-pina hover:text-pina">
              <InstagramIcon />
            </a>
            <a href={site.social.tiktok.url} target="_blank" rel="noopener noreferrer" aria-label="TikTok de Tacos Hermanos" className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 transition-colors hover:border-pina hover:text-pina">
              <TikTokIcon />
            </a>
          </div>
        </div>

        <nav aria-label="Pie de página">
          <h2 className="eyebrow text-pina">Explora</h2>
          <ul className="mt-5 space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-cream/70 transition-colors hover:text-cream">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow text-pina">Sucursales</h2>
          <ul className="mt-5 space-y-3">
            {branches.map((b) => (
              <li key={b.id}>
                <a href={mapsDirectionsUrl(b.mapsQuery)} target="_blank" rel="noopener noreferrer" className="text-cream/70 transition-colors hover:text-cream">
                  {b.name} <span className="text-cream/40">· {b.area}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="eyebrow text-pina">Contacto</h2>
          <ul className="mt-5 space-y-3 text-cream/70">
            <li>
              <a href={site.phone.href} className="transition-colors hover:text-cream">
                {site.phone.display}
              </a>
            </li>
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-cream">
                  {site.email}
                </a>
              </li>
            )}
            <li>
              <a href={site.social.instagram.url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cream">
                {site.social.instagram.handle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-5 py-6 text-sm text-cream/45 sm:flex-row sm:items-center sm:px-8">
          <p>© {year} Tacos Hermanos. Todos los derechos reservados.</p>
          <a href="#inicio" className="inline-flex items-center gap-2 font-semibold text-cream/70 transition-colors hover:text-cream">
            Volver arriba <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
