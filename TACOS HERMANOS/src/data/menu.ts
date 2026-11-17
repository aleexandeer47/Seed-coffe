/**
 * Menú de Tacos Hermanos.
 *
 * Nombres de platillos verificados en publicaciones oficiales de @tacoshermanossv
 * (Instagram / TikTok) y en reseñas públicas del restaurante.
 *
 * - `price`: se deja en `null` porque no hay precios oficiales publicados.
 *   La UI muestra "Precio en sucursal" mientras sea `null`.
 * - `provisional: true` marca nombres o descripciones redactados a partir de
 *   fotografías y que deben validarse con la marca antes de publicar.
 */

export type MenuCategoryId = "tacos" | "especialidades" | "desayunos" | "bebidas";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategoryId;
  image?: { src: string; alt: string };
  price: number | null;
  tags?: string[];
  provisional?: boolean;
}

export const menuCategories: { id: MenuCategoryId | "todos"; label: string }[] = [
  { id: "todos", label: "Todo" },
  { id: "tacos", label: "Tacos" },
  { id: "especialidades", label: "Especialidades" },
  { id: "desayunos", label: "Desayunos" },
  { id: "bebidas", label: "Bebidas" },
];

export const menuItems: MenuItem[] = [
  {
    id: "tacos-asada",
    name: "Tacos de Asada",
    description:
      "Nuestra legendaria asada en tortilla de maíz, con queso gratinado, cebolla y cilantro.",
    category: "tacos",
    image: { src: "/images/tacos-de-asada.webp", alt: "Tacos de asada con queso, cebolla y cilantro sobre tabla de madera" },
    price: null,
    tags: ["Favorito de la casa"],
  },
  {
    id: "tacos-gobernador",
    name: "Tacos Gobernador",
    description: "Difíciles de olvidar. Camarón con queso, aguacate y el toque de la casa.",
    category: "tacos",
    image: { src: "/images/tacos-de-camaron.webp", alt: "Tacos de camarón con aguacate, cilantro y aderezo" },
    price: null,
    tags: ["Camarón"],
    provisional: true,
  },
  {
    id: "quesabirrias",
    name: "Quesabirrias",
    description: "Birria jugosa y queso fundido en tortilla dorada, con consomé para mojar.",
    category: "tacos",
    price: null,
    tags: ["Birria"],
    provisional: true,
  },
  {
    id: "los-de-costilla",
    name: "Los de Costilla",
    description: "Tacos de costilla, del trompo de la casa directo a tu mesa.",
    category: "tacos",
    price: null,
    provisional: true,
  },
  {
    id: "los-enchorizados",
    name: "Los Enchorizados",
    description: "Para los que lo quieren todo: chorizo dorado y el sabor de siempre.",
    category: "tacos",
    price: null,
    provisional: true,
  },
  {
    id: "torta-consome",
    name: "Torta con Consomé",
    description: "Pan dorado y gratinado, carne deshebrada, guacamole y consomé al lado.",
    category: "especialidades",
    image: { src: "/images/torta-con-consome.webp", alt: "Torta gratinada con carne deshebrada, guacamole y consomé" },
    price: null,
    provisional: true,
  },
  {
    id: "papa-asada",
    name: "Papa Asada",
    description: "Nuestra irresistible papa asada, cargada al estilo Tacos Hermanos.",
    category: "especialidades",
    price: null,
  },
  {
    id: "queso-fundido",
    name: "Queso Fundido",
    description: "Queso fundido con carnitas y asada, para compartir en la mesa.",
    category: "especialidades",
    price: null,
    tags: ["Para compartir"],
  },
  {
    id: "sopa-casa",
    name: "Sopa de la Casa",
    description: "Caldo especiado con espiral de crema, cilantro fresco y tiras de tortilla.",
    category: "especialidades",
    image: { src: "/images/sopa-de-la-casa.webp", alt: "Sopa con espiral de crema y cilantro" },
    price: null,
    provisional: true,
  },
  {
    id: "omelette-asada",
    name: "Omelette de Asada",
    description: "Nuestra legendaria asada, huevos y quesos gratinados.",
    category: "desayunos",
    price: null,
    tags: ["Solo La Gran Vía"],
  },
  {
    id: "tostadas-francesa",
    name: "Tostadas a la Francesa",
    description: "Un clásico dulce para arrancar el día con calma.",
    category: "desayunos",
    price: null,
    tags: ["Solo La Gran Vía"],
  },
  {
    id: "cremoso-banano",
    name: "Cremoso de Banano",
    description: "Cremoso, frío y con banano: el acompañante del desayuno.",
    category: "desayunos",
    price: null,
    tags: ["Solo La Gran Vía"],
    provisional: true,
  },
  {
    id: "bebida-casa",
    name: "Bebida Especial de la Casa",
    description: "Bebida cremosa con hielo y escarchado crujiente en el borde.",
    category: "bebidas",
    image: { src: "/images/bebida-de-la-casa.webp", alt: "Bebida cremosa escarchada con hielo" },
    price: null,
    provisional: true,
  },
];

/** Salsas de la casa: nombres tomados de las botellas oficiales. */
export const salsas = [
  { name: "Taquera", color: "var(--color-chile)" },
  { name: "Cilantro Jalapeño", color: "var(--color-jalapeno)" },
  { name: "Piña Habanero", color: "var(--color-pina)" },
  { name: "Dulce de Chipotle", color: "var(--color-chipotle)" },
  { name: "Aguacate", color: "var(--color-aguacate)" },
] as const;

/** Platillos citados en canales oficiales: alimentan la cinta animada. */
export const signatureDishes = [
  "Quesabirrias",
  "Tacos Gobernador",
  "Los de Costilla",
  "Los Enchorizados",
  "Papa Asada",
  "Queso Fundido",
  "Omelette de Asada",
];
