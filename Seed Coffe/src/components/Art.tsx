import { motion, useInView, useTransform, type MotionValue, type Variants } from 'motion/react'
import { useRef } from 'react'

const ease = [0.65, 0, 0.35, 1] as const

// Cast: csstype's `pathLength` typing collides with Motion's SVG value type; runtime is fine.
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  shown: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.3, delay: 0.15 + i * 0.09, ease }, opacity: { duration: 0.01, delay: 0.15 + i * 0.09 } },
  }),
} as unknown as Variants

type LineArtProps = {
  paths: string[]
  viewBox?: string
  strokeWidth?: number
  /** When provided, drawing is scrubbed by this 0→1 value instead of playing on view. */
  progress?: MotionValue<number>
  children?: React.ReactNode
  className?: string
}

function ScrubPath({ d, i, n, progress }: { d: string; i: number; n: number; progress: MotionValue<number> }) {
  const start = (i / n) * 0.6
  const len = useTransform(progress, [start, start + 0.4], [0, 1], { clamp: true })
  return <motion.path d={d} style={{ pathLength: len }} />
}

export function LineArt({ paths, viewBox = '0 0 200 200', strokeWidth = 3, progress, children, className }: LineArtProps) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths.map((d, i) =>
        progress ? (
          <ScrubPath key={i} d={d} i={i} n={paths.length} progress={progress} />
        ) : (
          <motion.path
            key={i}
            d={d}
            variants={draw}
            initial="hidden"
            animate={inView ? 'shown' : 'hidden'}
            custom={i}
          />
        ),
      )}
      {children}
    </svg>
  )
}

/* ───────── Illustrations (viewBox 0 0 200 200) ───────── */

export const art = {
  iced: [
    'M62 72 L74 182 Q100 190 126 182 L138 72',
    'M54 72 L146 72 Q148 62 140 60 L60 60 Q52 62 54 72 Z',
    'M64 60 Q100 20 136 60',
    'M104 42 L126 4 L134 9 L113 46',
    'M68 102 Q84 92 100 102 T134 100',
    'M80 124 l15 -5 l5 15 l-15 5 Z',
    'M106 144 l15 4 l-4 15 l-15 -4 Z',
  ],
  bottle: [
    'M84 18 L116 18 L116 34 L84 34 Z',
    'M88 34 L88 58 Q66 72 66 96 L66 176 Q66 186 76 186 L124 186 Q134 186 134 176 L134 96 Q134 72 112 58 L112 34',
    'M66 112 L134 112',
    'M66 158 L134 158',
    'M100 150 Q84 135 100 120 Q116 135 100 150 Z',
    'M100 150 L100 126',
  ],
  flanCafe: [
    'M22 160 Q100 198 178 160 Q100 132 22 160 Z',
    'M56 154 L70 92 Q100 82 130 92 L144 154 Q100 166 56 154 Z',
    'M70 92 Q100 104 130 92',
    'M78 97 Q79 112 83 114 Q87 112 87 100',
    'M112 100 Q114 120 118 122 Q122 118 123 98',
    'M90 80 Q100 60 112 74 Q102 92 90 80 Z',
    'M93 80 Q101 74 109 73',
  ],
  flanCoco: [
    'M22 160 Q100 198 178 160 Q100 132 22 160 Z',
    'M50 154 L64 94 Q94 84 124 94 L138 154 Q94 166 50 154 Z',
    'M64 94 Q94 106 124 94',
    'M80 82 L88 72',
    'M96 84 L104 70',
    'M110 86 L118 76',
    'M146 150 a22 22 0 0 1 44 0 Z',
    'M153 150 a15 15 0 0 1 30 0',
  ],
  bagel: [
    'M38 104 a62 34 0 1 0 124 0 a62 34 0 1 0 -124 0',
    'M84 102 a16 9 0 1 0 32 0 a16 9 0 1 0 -32 0',
    'M38 104 L38 120 a62 34 0 0 0 124 0 L162 104',
    'M58 92 l5 2',
    'M130 86 l5 -1',
    'M144 108 l3 4',
    'M64 116 l5 0',
    'M110 126 l4 2',
  ],
  sandwich: [
    'M28 146 L100 56 L172 146 Z',
    'M28 146 L28 168 L172 168 L172 146',
    'M34 156 Q44 148 54 156 T74 156 T94 156 T114 156 T134 156 T154 156 T170 154',
    'M84 118 a16 11 0 1 0 32 0 a16 11 0 1 0 -32 0',
    'M95 118 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0',
  ],
  beanBag: [
    'M58 46 L142 46 L154 182 L46 182 Z',
    'M58 46 L66 30 L134 30 L142 46',
    'M78 30 L78 46 M122 30 L122 46',
    'M80 110 Q100 82 122 104 Q104 136 80 110 Z',
    'M84 112 Q100 100 118 102',
  ],
}

export const storefront = [
  'M14 270 L286 270',
  'M40 270 L40 90 L260 90 L260 270',
  'M28 90 L272 90 L272 70 L28 70 Z',
  'M40 90 L40 112 Q51 125 62 112 Q73 125 84 112 Q95 125 106 112 Q117 125 128 112 Q139 125 150 112 Q161 125 172 112 Q183 125 194 112 Q205 125 216 112 Q227 125 238 112 Q249 125 260 112 L260 90',
  'M62 90 L62 112 M84 90 L84 112 M106 90 L106 112 M128 90 L128 112 M150 90 L150 112 M172 90 L172 112 M194 90 L194 112 M216 90 L216 112 M238 90 L238 112',
  'M56 134 L186 134 L186 238 L56 238 Z',
  'M80 148 L162 148 L162 180 L80 180 Z',
  'M56 214 L186 214',
  'M204 134 L246 134 L246 270 L204 270 Z',
  'M212 146 L238 146 L238 188 L212 188 Z',
  'M214 204 L214 214',
  'M20 270 L26 244 L50 244 L56 270',
  'M38 244 Q22 220 30 196 M38 244 Q54 222 48 200 M38 244 L38 206',
  'M66 214 L66 200 Q76 194 86 200 L86 214 M120 214 L124 196 L138 196 L142 214',
]

/* ───────── Starburst sticker ───────── */

export function Starburst({ fill, spikes = 16, depth = 0.16 }: { fill: string; spikes?: number; depth?: number }) {
  const pts: string[] = []
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? 50 : 50 * (1 - depth)
    const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2
    pts.push(`${(50 + Math.cos(a) * r).toFixed(2)},${(50 + Math.sin(a) * r).toFixed(2)}`)
  }
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <polygon points={pts.join(' ')} fill={fill} />
    </svg>
  )
}

/* ───────── Logo badge (circle with ring text) ───────── */

export function Badge({ size = 40, spin = false }: { size?: number; spin?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="49" fill="#151311" />
      <defs>
        <path id="badge-ring" d="M50 50 m-36 0 a36 36 0 1 1 72 0 a36 36 0 1 1 -72 0" />
      </defs>
      <g style={spin ? { transformOrigin: '50px 50px', animation: 'spin 14s linear infinite' } : undefined}>
        <text fill="#f3eee4" fontSize="13" fontWeight="700" letterSpacing="3.4" fontFamily="Jost, sans-serif">
          <textPath href="#badge-ring">SEED · COFFEE · CO · </textPath>
        </text>
      </g>
      <path d="M50 64 Q38 52 50 36 Q62 52 50 64 Z" fill="#f3eee4" />
      <path d="M50 64 L50 44" stroke="#151311" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

/* ───────── Small icons (1.75 stroke) ───────── */

export const Icon = {
  arrow: (
    <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  pin: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
  ig: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  ),
  seal: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 13l5 5L20 6" />
    </svg>
  ),
}
