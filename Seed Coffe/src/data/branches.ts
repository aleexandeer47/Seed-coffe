export type Branch = {
  name: string
  address: string
  city: string
  phone: string
  /** 0 = domingo … 6 = sábado */
  openDays: number[]
  opens: number
  closes: number
  hoursLabel: string
  mapsQuery: string
  delivery?: string
}

/**
 * Para agregar otra sucursal, copia un objeto y ajusta los datos.
 * La sección de sucursales se adapta sola (1, 2 o más).
 */
export const branches: Branch[] = [
  {
    name: 'Seed Coffee · Las Rosas',
    address: 'Calle Las Rosas #8',
    city: 'San Salvador, El Salvador',
    phone: '+503 7785 0258',
    openDays: [1, 2, 3, 4, 5, 6],
    opens: 9,
    closes: 20,
    hoursLabel: 'Lunes a sábado · 9:00 a.m. – 8:00 p.m.',
    mapsQuery: 'Seed Coffee Calle Las Rosas 8 San Salvador',
    delivery: 'PedidosYa',
  },
]

export const INSTAGRAM = 'https://www.instagram.com/seedcoffeesv/'
