"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Menu, X } from "lucide-react";
import { navLinks, site, whatsappUrl } from "@/data/site";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { buttonClasses } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wa = whatsappUrl();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: lock scroll + close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid ? "bg-paper/85 shadow-[0_1px_0_rgb(19_32_27/0.08)] backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav aria-label="Principal" className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#inicio" className="relative z-10 shrink-0" aria-label="Tacos Hermanos, ir al inicio" onClick={() => setOpen(false)}>
          <Logo variant={solid ? "green" : "white"} className="h-8 w-auto sm:h-9" priority />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    solid ? (isActive ? "text-brand" : "text-ink/75 hover:text-ink") : isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className={`absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full ${solid ? "bg-brand" : "bg-pina"}`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={wa ?? "#sucursales"}
            {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={buttonClasses(solid ? "primary" : "light", "min-h-11 px-5 text-sm max-sm:hidden")}
          >
            {wa ? <WhatsAppIcon size={18} /> : <MapPin size={18} aria-hidden="true" />}
            <span>{wa ? "Pide por WhatsApp" : "Cómo llegar"}</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className={`relative z-10 grid h-11 w-11 place-items-center rounded-full transition-colors lg:hidden ${
              solid ? "bg-forest text-cream" : "bg-white/10 text-white backdrop-blur"
            }`}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="tile-texture fixed inset-0 bg-forest lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 2.6rem) 2.25rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.6rem) 2.25rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.6rem) 2.25rem)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-full flex-col justify-between px-6 pt-28 pb-10">
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="font-display flex items-baseline gap-4 py-2 text-[2.5rem] leading-tight font-extrabold text-cream transition-colors hover:text-pina"
                    >
                      <span className="font-sans text-xs font-bold tracking-widest text-teal">0{i + 1}</span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-6">
                <a
                  href={wa ?? "#sucursales"}
                  onClick={() => setOpen(false)}
                  {...(wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={buttonClasses("light", "w-full")}
                >
                  {wa ? <WhatsAppIcon size={18} /> : <MapPin size={18} aria-hidden="true" />}
                  <span>{wa ? "Pide por WhatsApp" : "Encuentra tu sucursal"}</span>
                </a>
                <div className="flex items-center justify-between text-cream/70">
                  <span className="text-sm font-semibold">{site.tagline}</span>
                  <div className="flex gap-3">
                    <a href={site.social.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Tacos Hermanos" className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 hover:border-cream hover:text-cream">
                      <InstagramIcon />
                    </a>
                    <a href={site.social.tiktok.url} target="_blank" rel="noopener noreferrer" aria-label="TikTok de Tacos Hermanos" className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 hover:border-cream hover:text-cream">
                      <TikTokIcon />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
