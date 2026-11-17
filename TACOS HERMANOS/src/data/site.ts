/**
 * Datos globales de la marca.
 *
 * Fuentes verificadas (noviembre 2026):
 *  - Instagram oficial: @tacoshermanossv (bio: "¡Ya somos hermanos!")
 *  - TikTok oficial: @tacoshermanossv
 *  - Frases de marca tomadas de la señalética del restaurante
 *    ("Lo bonito ¡se comparte!" y el manifiesto "Somos tres... ¡Ya somos hermanos!").
 *
 * PENDIENTE DE CONFIRMAR CON LA MARCA:
 *  - `phone`: aparece en directorios (Tripadvisor / guías locales) para San Benito,
 *    no en un canal oficial. Confirmar antes de publicar.
 *  - `whatsapp` y `email`: no se encontró un canal oficial público. Cuando la marca
 *    los proporcione, basta con rellenarlos aquí y los botones aparecen solos.
 */

export const site = {
  name: "Tacos Hermanos",
  tagline: "¡Ya somos hermanos!",
  shareLine: "Lo bonito se comparte",
  description:
    "Taquería mexicana en El Salvador. Tacos, quesabirrias, especialidades y cinco salsas de la casa para compartir en San Benito, La Gran Vía y Paseo Venecia.",
  url: "https://www.tacoshermanos.com.sv", // PROVISIONAL: dominio por confirmar
  locale: "es_SV",

  phone: { display: "+503 7170 3880", href: "tel:+50371703880", verified: false },
  /** Número en formato internacional sin "+" ni espacios, p. ej. "50370000000". */
  whatsapp: null as string | null,
  email: null as string | null,

  social: {
    instagram: { handle: "@tacoshermanossv", url: "https://www.instagram.com/tacoshermanossv/" },
    tiktok: { handle: "@tacoshermanossv", url: "https://www.tiktok.com/@tacoshermanossv" },
  },
} as const;

export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#menu", label: "Nuestro menú" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#sucursales", label: "Sucursales" },
  { href: "#contacto", label: "Contáctanos" },
] as const;

export function whatsappUrl(message = "¡Hola, Tacos Hermanos! Quisiera hacer una consulta.") {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
