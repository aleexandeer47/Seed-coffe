export type MenuItem = {
  name: string
  note?: string
  /** One price per size column; null when that size isn't offered. */
  prices: (number | null)[]
  original?: boolean
}

export type MenuGroup = {
  title?: string
  /** Column headers. A single empty header renders as a plain price column. */
  sizes: string[]
  items: MenuItem[]
}

export type MenuCategory = {
  id: string
  label: string
  groups: MenuGroup[]
  footnote?: string
}

const EXTRA = 'Leche vegetal o saborizantes: +$0.80'

export const menu: MenuCategory[] = [
  {
    id: 'cafe-caliente',
    label: 'Café caliente',
    footnote: EXTRA,
    groups: [
      {
        sizes: ['8 oz', '12 oz'],
        items: [
          { name: 'Métodos', note: 'Café filtrado', prices: [3.6, 4.0] },
          { name: 'Americano', prices: [2.3, 3.0] },
          { name: 'Cappuccino', prices: [3.7, 4.5] },
          { name: 'Latte', prices: [3.7, 4.5] },
          { name: 'Mocca', prices: [4.25, 5.0] },
        ],
      },
      {
        title: 'Espresso',
        sizes: ['Sencillo', 'Doble'],
        items: [
          { name: 'Espresso', prices: [2.4, null] },
          { name: 'Cortado', prices: [2.5, 4.0] },
        ],
      },
      {
        title: 'Para llevar a casa',
        sizes: [''],
        items: [{ name: 'Bolsa de café de especialidad', prices: [20] }],
      },
    ],
  },
  {
    id: 'caliente-sin-cafe',
    label: 'Calientes sin café',
    footnote: EXTRA,
    groups: [
      {
        sizes: ['8 oz', '12 oz'],
        items: [
          { name: 'Chocolate', prices: [3.3, 3.85] },
          { name: 'Chai', prices: [4.25, 5.0] },
          { name: 'Taro', prices: [4.5, 5.25] },
          { name: 'Matcha', prices: [4.5, 5.25] },
          { name: 'Infusiones', prices: [4.25, null] },
        ],
      },
    ],
  },
  {
    id: 'cafe-frio',
    label: 'Café frío',
    footnote: EXTRA,
    groups: [
      {
        sizes: ['12 oz', '16 oz', '20 oz'],
        items: [
          { name: 'Foamy Iced', note: 'Sweet and creamy', prices: [null, 5.25, 5.75], original: true },
          { name: 'Frappé chai', prices: [4.25, 4.75, 5.25] },
          { name: 'Iced coffee', prices: [3.3, null, null] },
          { name: 'Iced latte', prices: [4.25, 4.75, 5.25] },
          { name: 'Frappuchata', prices: [null, 5.25, 5.75] },
          { name: 'Frappé saborizado', prices: [4.75, 5.25, 5.75] },
        ],
      },
      {
        title: 'Cold brew',
        sizes: [''],
        items: [
          { name: 'Cold brew', prices: [4.0], original: true },
          { name: 'Cold brew mix', note: 'Variedad', prices: [4.5] },
          { name: 'Cold brew concentrado', note: 'Botella de 8 oz', prices: [6.0] },
        ],
      },
    ],
  },
  {
    id: 'frio-sin-cafe',
    label: 'Fríos sin café',
    footnote: EXTRA,
    groups: [
      {
        sizes: ['12 oz', '16 oz', '20 oz'],
        items: [
          { name: 'Chai', prices: [4.25, 4.75, 5.75] },
          { name: 'Matcha', note: 'Iced o frozen', prices: [null, 4.75, 5.75] },
          { name: 'Taro', note: 'Iced o frozen', prices: [null, 5.25, 5.75] },
          { name: 'Frozen de fruta', prices: [4.0, null, null] },
          { name: 'Soda italiana', prices: [4.75, null, null] },
        ],
      },
    ],
  },
  {
    id: 'salado',
    label: 'Salado',
    groups: [
      {
        sizes: [''],
        items: [
          { name: 'Panini caprese', prices: [6.0] },
          { name: 'Panini de jamón y queso', prices: [6.0] },
          { name: 'Panini de pollo', prices: [6.5] },
          { name: 'Sándwich de pollo con huevo', prices: [6.6], original: true },
          { name: 'Pizza personal', note: 'Jamón, pepperoni o margarita', prices: [6.6] },
          { name: 'Pizza de pollo', prices: [7.5] },
          { name: 'Bagel con queso crema', prices: [3.0] },
          { name: 'Bagel especial', note: 'Con crema de la casa', prices: [5.5], original: true },
        ],
      },
    ],
  },
  {
    id: 'dulce',
    label: 'Dulce',
    groups: [
      {
        sizes: [''],
        items: [
          { name: 'Loaf', note: 'Variedad del día', prices: [2.8] },
          { name: 'Pie de limón', prices: [4.75] },
          { name: 'Cheesecake', prices: [4.75] },
          { name: 'Flan de coco', prices: [5.0], original: true },
          { name: 'Flan de café', note: 'Con café Pacas lavado', prices: [5.0], original: true },
          { name: 'Postre de la semana', prices: [4.5] },
          { name: '2 galletas', note: 'Choco chips, macadamia o avena', prices: [2.2] },
        ],
      },
      {
        title: 'Para acompañar',
        sizes: [''],
        items: [
          { name: 'Soda / mineral', prices: [1.5] },
          { name: 'Agua', prices: [1.2] },
        ],
      },
    ],
  },
]

export const price = (n: number) => `$${n.toFixed(2)}`
