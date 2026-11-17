"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2, Mail, Phone, Send } from "lucide-react";
import { site, whatsappUrl } from "@/data/site";
import { submitContact, validateContact, type ContactErrors, type ContactPayload } from "@/lib/contact";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { buttonClasses } from "@/components/ui/Button";

const empty: ContactPayload = { name: "", email: "", phone: "", message: "" };
type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [values, setValues] = useState<ContactPayload>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactPayload, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const wa = whatsappUrl();

  const update = (field: keyof ContactPayload, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (status === "success" || status === "error") setStatus("idle");
    if (touched[field]) setErrors(validateContact(next));
  };

  const blur = (field: keyof ContactPayload) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validateContact(values));
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, message: true });
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submitContact(values);
      setStatus("success");
      setValues(empty);
      setTouched({});
    } catch {
      setStatus("error");
    }
  };

  const channels = [
    wa && { href: wa, label: "WhatsApp", value: "Escríbenos ahora", icon: <WhatsAppIcon />, external: true },
    { href: site.phone.href, label: "Teléfono · San Benito", value: site.phone.display, icon: <Phone size={20} aria-hidden="true" /> },
    site.email && { href: `mailto:${site.email}`, label: "Correo", value: site.email, icon: <Mail size={20} aria-hidden="true" /> },
    { href: site.social.instagram.url, label: "Instagram", value: site.social.instagram.handle, icon: <InstagramIcon />, external: true },
    { href: site.social.tiktok.url, label: "TikTok", value: site.social.tiktok.handle, icon: <TikTokIcon />, external: true },
  ].filter(Boolean) as { href: string; label: string; value: string; icon: ReactNode; external?: boolean }[];

  return (
    <section id="contacto" aria-labelledby="contact-title" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              id="contact-title"
              eyebrow="Contáctanos"
              title={
                <>
                  Hablemos,
                  <br />
                  hermano.
                </>
              }
              intro="Eventos, pedidos grandes, sugerencias o simplemente saludar: te respondemos por el canal que prefieras."
            />

            <Reveal delay={0.1}>
              <ul className="mt-10 divide-y divide-forest/10 border-y border-forest/10">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex min-h-16 items-center gap-4 py-4"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest text-cream transition-colors group-hover:bg-brand">
                        {c.icon}
                      </span>
                      <span className="flex-1">
                        <span className="block text-xs font-bold tracking-wider text-muted uppercase">{c.label}</span>
                        <span className="font-display block text-lg font-bold text-forest">{c.value}</span>
                      </span>
                      <ArrowUpRight
                        size={20}
                        className="text-forest/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <form
              onSubmit={onSubmit}
              noValidate
              aria-describedby="form-status"
              className="relative rounded-[2rem] bg-paper p-6 shadow-[0_40px_80px_-50px_rgb(12_50_39/0.45)] ring-1 ring-forest/10 sm:p-10"
            >
              <h3 className="text-2xl font-extrabold text-forest">Envíanos un mensaje</h3>
              <p className="mt-1 text-sm text-muted">Los campos con * son obligatorios.</p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Nombre *" autoComplete="name" value={values.name} error={touched.name ? errors.name : undefined} onChange={update} onBlur={blur} />
                <Field id="phone" label="Teléfono" type="tel" autoComplete="tel" inputMode="tel" value={values.phone} error={touched.phone ? errors.phone : undefined} onChange={update} onBlur={blur} />
                <div className="sm:col-span-2">
                  <Field id="email" label="Correo electrónico *" type="email" autoComplete="email" inputMode="email" value={values.email} error={touched.email ? errors.email : undefined} onChange={update} onBlur={blur} />
                </div>
                <div className="sm:col-span-2">
                  <Field id="message" label="Mensaje *" multiline value={values.message} error={touched.message ? errors.message : undefined} onChange={update} onBlur={blur} />
                </div>
              </div>

              <button type="submit" disabled={status === "sending"} className={buttonClasses("primary", "mt-8 w-full sm:w-auto")}>
                {status === "sending" ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
                <span>{status === "sending" ? "Enviando…" : "Enviar mensaje"}</span>
              </button>

              <div id="form-status" role="status" aria-live="polite">
                <AnimatePresence>
                  {status === "success" && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 flex items-start gap-3 rounded-2xl bg-brand/10 p-4 font-semibold text-brand-700"
                    >
                      <CheckCircle2 size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
                      ¡Gracias, hermano! Recibimos tu mensaje y te responderemos pronto.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-6 flex items-start gap-3 rounded-2xl bg-chile/10 p-4 font-semibold text-chile"
                    >
                      <AlertCircle size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
                      No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos por Instagram.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  id: keyof ContactPayload;
  label: string;
  value: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
  multiline?: boolean;
  onChange: (id: keyof ContactPayload, value: string) => void;
  onBlur: (id: keyof ContactPayload) => void;
}

function Field({ id, label, value, error, type = "text", autoComplete, inputMode, multiline, onChange, onBlur }: FieldProps) {
  const fieldId = `contact-${id}`;
  const errorId = `${fieldId}-error`;
  const valid = !error && value.trim().length > 0;
  const cls = `peer w-full rounded-2xl bg-white px-4 text-base text-ink ring-1 ring-inset transition-shadow outline-none placeholder:text-ink/35 focus:ring-2 ${
    error ? "ring-chile focus:ring-chile" : valid ? "ring-brand/50 focus:ring-brand" : "ring-forest/15 focus:ring-brand"
  }`;
  const common = {
    id: fieldId,
    name: id,
    value,
    "aria-invalid": !!error,
    "aria-describedby": error ? errorId : undefined,
    onChange: (e: { target: { value: string } }) => onChange(id, e.target.value),
    onBlur: () => onBlur(id),
  };

  return (
    <div>
      <label htmlFor={fieldId} className="mb-2 block text-sm font-bold text-forest">
        {label}
      </label>
      {multiline ? (
        <textarea {...common} rows={5} className={`${cls} resize-y py-3`} placeholder="¿En qué podemos ayudarte?" />
      ) : (
        <input {...common} type={type} autoComplete={autoComplete} inputMode={inputMode} className={`${cls} h-13 min-h-12`} />
      )}
      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 overflow-hidden pt-2 text-sm font-semibold text-chile"
          >
            <AlertCircle size={14} aria-hidden="true" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
