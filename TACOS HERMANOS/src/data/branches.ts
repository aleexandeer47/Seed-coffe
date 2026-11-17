/**
 * Sucursales de Tacos Hermanos.
 *
 * Las tres sucursales aparecen en la bio oficial de Instagram (@tacoshermanossv):
 * "📍 San Benito 📍 La Gran Vía 📍 Paseo Venecia - Soyapango 📍 Las ...".
 * La bio continúa (posiblemente "Las Ramblas", Santa Ana), pero no pudo
 * verificarse completa: agregar aquí cuando la marca lo confirme.
 *
 * `hoursVerified: false` → la UI muestra la etiqueta "Horario por confirmar".
 * `mapsQuery` se usa tanto para el mapa embebido como para "Cómo llegar",
 * así Google Maps resuelve la ficha real del negocio.
 */

export interface Branch {
  id: string;
  name: string;
  area: string;
  address: string;
  hours: { days: string; time: string }[];
  hoursVerified: boolean;
  phone?: { display: string; href: string };
  note?: string;
  mapsQuery: string;
}

export const branches: Branch[] = [
  {
    id: "san-benito",
    name: "San Benito",
    area: "San Salvador",
    address: "Calle Circunvalación #130, Colonia San Benito, San Salvador",
    hours: [
      { days: "Lunes a viernes", time: "12:00 – 15:00 · 18:00 – 21:00" },
      { days: "Fines de semana", time: "Por confirmar" },
    ],
    hoursVerified: false,
    phone: { display: "+503 7170 3880", href: "tel:+50371703880" },
    mapsQuery: "Tacos Hermanos San Benito, Calle Circunvalación 130, San Salvador",
  },
  {
    id: "la-gran-via",
    name: "La Gran Vía",
    area: "Antiguo Cuscatlán",
    address: "Centro Comercial La Gran Vía, nivel 2, local 207, Antiguo Cuscatlán",
    hours: [
      { days: "Desayunos · lunes a domingo", time: "7:00 – 10:30" },
      { days: "Almuerzo y cena", time: "Por confirmar" },
    ],
    hoursVerified: false,
    note: "Única sucursal con desayunos",
    mapsQuery: "Tacos Hermanos La Gran Vía, Antiguo Cuscatlán",
  },
  {
    id: "paseo-venecia",
    name: "Paseo Venecia",
    area: "Soyapango",
    address: "Centro Comercial Paseo Venecia, Soyapango",
    hours: [{ days: "Horario", time: "Por confirmar" }],
    hoursVerified: false,
    mapsQuery: "Tacos Hermanos Paseo Venecia, Soyapango",
  },
];

export const allBranchesQuery = "Tacos Hermanos, El Salvador";

export const mapsEmbedUrl = (query: string, zoom = 15) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;

export const mapsDirectionsUrl = (query: string) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
