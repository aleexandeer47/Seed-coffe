# Tacos Hermanos: sitio web oficial (propuesta)

Sitio informativo de una sola página con Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion y Lucide.

## Cómo ejecutarlo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # producción
```

## Estructura

```
src/
  app/            layout (metadatos SEO, fuentes), page, sitemap, robots, icon
  components/
    layout/       Navbar, Footer, MotionProvider (respeta "reducir movimiento")
    sections/     Hero, Marquee, MenuSection, MenuCard, MenuListItem, SalsasBand, About, Branches, Contact
    ui/           Button, Logo, Reveal, SectionHeading, Sunburst, Icons
  data/           site.ts, menu.ts, branches.ts, about.ts  ← todo el contenido editable
  lib/            contact.ts (validación + envío), structured-data.ts (JSON-LD)
public/images/    fotografías optimizadas (WebP) y logotipo (verde y blanco)
```

Para cambiar textos, platillos o sucursales solo hay que editar `src/data/`.

## Identidad visual

- **Verde de marca `#1C7F5F`**: tomado del logotipo oficial.
- Verde botella profundo, papel crema y acentos con los colores de las cinco salsas de la casa.
- **Arcos**: los marcos de fotografía repiten la "A" en arco del logotipo.
- **Rayos**: el motivo radial viene del corazón de luz del restaurante y de las etiquetas de las salsas.
- **Textura facetada**: inspirada en la pared de azulejos 3D verde y blanco.
- Tipografías: Bricolage Grotesque (títulos) y Manrope (texto).
- Textos de marca reales: "Lo bonito se comparte" (neón) y el manifiesto "Somos tres… ¡Ya somos hermanos!" (pared).

## Pendiente de confirmar con la marca

| Dato | Estado | Dónde se edita |
| --- | --- | --- |
| Precios | No hay precios oficiales públicos. Se muestra "Precio en sucursal". | `data/menu.ts` → `price` |
| Descripciones o nombres marcados `provisional: true` | Redactados a partir de fotografías | `data/menu.ts` |
| Historia de la marca | Texto provisional, sin fechas ni cifras inventadas | `data/about.ts` → `story` |
| Horarios | Solo los desayunos de La Gran Vía (7:00–10:30) están confirmados en Instagram. El resto es referencial. | `data/branches.ts` |
| Teléfono +503 7170 3880 | Sale de directorios (Tripadvisor y guías), no de un canal oficial | `data/site.ts`, `data/branches.ts` |
| WhatsApp / correo | No se encontró canal oficial. Al rellenarlos aparecen los botones automáticamente. | `data/site.ts` |
| Más sucursales | La bio de Instagram continúa después de "📍 Las…" (posiblemente Las Ramblas, Santa Ana) | `data/branches.ts` |
| Fotos de Quesabirrias, Costilla, Enchorizados, etc. | Sin foto oficial, se presentan en formato de carta tipográfica | `data/menu.ts` → `image` |
| Dominio | `tacoshermanos.com.sv` es provisional | `data/site.ts` → `url` |

## Formulario de contacto

La validación es del lado del cliente. Para enviar mensajes reales, define `NEXT_PUBLIC_CONTACT_ENDPOINT` con un servicio que acepte JSON por POST (Formspree, Getform o una Route Handler propia). Sin esa variable, el envío se simula para la demostración.

## Fuentes consultadas

- Instagram oficial [@tacoshermanossv](https://www.instagram.com/tacoshermanossv/) (bio, sucursales, platillos y desayunos)
- TikTok oficial [@tacoshermanossv](https://www.tiktok.com/@tacoshermanossv)
- Fichas de Tripadvisor, Waze y Google Maps para direcciones y horarios referenciales
