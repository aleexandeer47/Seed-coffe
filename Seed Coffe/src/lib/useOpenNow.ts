import { useEffect, useState } from 'react'
import type { Branch } from '../data/branches'

const DAY: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

function check(b: Branch) {
  // Evaluate in El Salvador time regardless of the visitor's timezone.
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/El_Salvador',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(new Date())
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const day = DAY[get('weekday')]
  const h = Number(get('hour')) + Number(get('minute')) / 60
  return b.openDays.includes(day) && h >= b.opens && h < b.closes
}

export function useOpenNow(b: Branch) {
  const [open, setOpen] = useState(() => check(b))
  useEffect(() => {
    const id = setInterval(() => setOpen(check(b)), 60_000)
    return () => clearInterval(id)
  }, [b])
  return open
}
